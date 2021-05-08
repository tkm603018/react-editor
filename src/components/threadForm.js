import React, {useEffect, useRef, useState, useMemo}from 'react'

import {
  makeStyles, Grid, Box, IconButton,
  Tooltip, Snackbar, 
  GridList, GridListTile, GridListTileBar
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert'

import {
  Close as CloseIcon,
} from '@material-ui/icons'

import newRichDraft from './newRichDraft/threadIndex'
import { DB, storage } from '../actions/firebase'
import NewIconButton from './newIconButton'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(0),
    },
    '& hr': {
      margin: theme.spacing(0, 1),
    },
  },
  listItem: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  box: {
    border: "0.05rem solid #ededed",
    borderRadius: "6px",
    '& #mui-rte-editor-container': {
      background: '#303030',
      '& a': {
        color: '#f48fb1'
      },
    },
  },
  singleLineGridList: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  gridListTileBar: {
    color: theme.palette.primary.light,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default ({
  threads, setThreads, contents, setContents,
  thread, setThread,
  contentInput, setContentInput,
  threadInput, setThreadInput
}) => {
  const classes = useStyles()
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal, open } = state
  const [severity, setSeverity] = useState("error")
  const [media, setMedia] = useState()
  const [localMedia, setLocalMedia] = useState([])

  const date = {
    year: String(new Date().getFullYear()),
    month: String(new Date().getMonth()),
    date: String(new Date().getDate()),
    hours: String(new Date().getHours()),
    minutes: String(new Date().getMinutes()),
  }
  const body = {
    media: media,
    date_at: date,
  }
  const handleContentSave = (html)=>{
    const apiBody = { ...body, content: html }
      threadInput ? onThreadUpdate({ item: threadInput, apiBody }) : (thread && onThreadAdd({ thread, apiBody }))
  }

  const content = newRichDraft({
    defaultValue: "", label: "入力してください",
    value: threadInput && threadInput.content,
    controls: [
      "title", "bold", "italic", "underline", "strikethrough", "highlight", 
      "undo", "redo", "link", 
      "numberList", "bulletList", "quote",
    ],
    onSave: handleContentSave,
  })

  // 画像アップロード
  const uploadMultipleFiles = (e) => {
    const fileObj = []
    const fileArray = []
    fileObj.push(e.target.files)
    for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]))
    }
    setLocalMedia(fileArray)
    setMedia(e.target.files)
  }

  const handleSelectImage = (url) => {
    setLocalMedia(localMedia && localMedia.filter((x) => { return !(x === url) }))
  }

  const onImageSubmit = ({ postId }) => {
    const uploadTask = media && Array.from(media).map((file) => {
      storage.ref().child(`images/${postId}/${file.name}`).put(file).then((snapshot) => {})
      console.log("postId, file", postId, file)
    })
    setLocalMedia([])
  }


  const onThreadAdd = ({ thread, apiBody }) => {
    const status = apiBody.content === "<p><br></p>" ? "error" : "success"
    setSeverity(status)
    var newBodyList = DB.ref('threads').push()
    var postId = newBodyList.key
    status === "success" && thread && newBodyList.set(JSON.stringify(Object.assign({ key: postId, threadKey: thread }, apiBody)))
    onImageSubmit({postId})
    setThreadInput && setThreadInput()
  }

  const onThreadUpdate = ({ item, apiBody }) => {
    const body = {
      key: item.key,
      threadKey: item.threadKey,
    }
    item && apiBody && DB.ref('threads').child(item.key).set(
      JSON.stringify(Object.assign(body, apiBody))
    ).then(res => { }).catch(error => {
      console.log(error)
    })
    setSeverity("success")
    setThreadInput && setThreadInput()
  }
  

const SubBar = ({ cont, handleClick }) => {
  return (
    <Box component="div" m={1}>
      <Grid container style={{ flexGrow: 1 }}>
        <Grid item style={{ flexGrow: 1 }}>
          <NewIconButton
            variant='outlined'
            icon='image'
            render={
            <input
              id="media"
              type="file"
              accept="image/*"
              style={{ opacity: 0, appearance: 'none', position: 'absolute' }}
              onChange={uploadMultipleFiles}
              multiple
            ></input>
            }
          />
          {/* <NewIconButton
            variant='outlined'
            icon='gif'
          /> */}
        </Grid>
        <Grid item>
          <Tooltip title='Send a message' placement='left' arrow>
            <NewIconButton
              // disabled={content && content.raw.blocks[0].text === "" ? 1 : 0}
              variant='outlined'
              icon='send'
              onClick={() => {
                cont.save()
                handleClick({ vertical: 'top', horizontal: 'center' })
              }}
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item className={classes.singleLineGridList}>
        <GridList className={classes.gridList} cols={5}>
          {localMedia && localMedia.map((url) => {
            return ( 
              <GridListTile key={url} style={{ width: '300px', height: '200px' }}>
                <img src={url} alt={url} />
                <GridListTileBar
                  title={url}
                  className={classes.gridListTileBar}
                  actionIcon={
                    <IconButton
                      onClick={() => handleSelectImage(url)}
                    >
                      <CloseIcon className={classes.title} />
                    </IconButton>}
                  />
            </GridListTile>
            )
        })}
      </GridList>
      </Grid>
    </Box>
  )
}
  
  const handleClick = (newState) => {
    setState({ open: true, ...newState })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  return (
    <Box
      component="div"
      className={classes.box}
      m={1}
      style={(threadInput && threadInput.content) && {
        backgroundColor: 'rgba(242,199,68,.2)',
      }}
    >
      <Box component="div" m={2}>
        {content.render}
        <SubBar
          cont={content}
          handleClick={handleClick}
        />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          { severity === 'success'? 'Sent a message' : 'Input content is empty'}
        </Alert>
      </Snackbar>
    </Box>
  )
}
