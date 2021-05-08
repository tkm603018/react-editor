import React, {useEffect, useRef, useState, useMemo}from 'react'

import {
  makeStyles, Paper, Grid, List, Box,
  Divider, Typography, Button, IconButton,
  Tooltip, MenuItem, ListItem, Icon,
  createMuiTheme, MuiThemeProvider, ListItemText, ListItemSecondaryAction
} from '@material-ui/core';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import MUIRichTextEditor from "mui-rte";
import newTextField from '../components/newTextField'

import newRichDraft from './newRichDraft/threadIndex'
import { DB } from '../actions/firebase'

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
}));

export default ({
  threads, setThreads, contents, setContents,
  thread, setThread,
  contentInput, setContentInput,
  threadInput, setThreadInput
}) => {
  const classes = useStyles()

  const date = {
    year: String(new Date().getFullYear()),
    month: String(new Date().getMonth()),
    date: String(new Date().getDate()),
    hours: String(new Date().getHours()),
    minutes: String(new Date().getMinutes()),
  }
  const body = {
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
      // "shop_introduction", "asset", "media", 
      "title", "bold", "italic", "underline", "strikethrough", "highlight", 
      "undo", "redo", "link", 
      "numberList", "bulletList", "quote",
    ],
    // assetsModule, 
    onSave: handleContentSave,
  })

  const onThreadAdd = ({ thread, apiBody }) => {
    var newBodyList = DB.ref('threads').push()
    var postId = newBodyList.key
    thread && newBodyList.set(JSON.stringify(Object.assign({ key: postId, threadKey: thread }, apiBody)))
    setThreadInput && setThreadInput()
  }

  const onThreadUpdate = ({ item, apiBody }) => {
    console.log("apiBody", apiBody)
    const body = {
      key: item.key,
      threadKey: item.threadKey,
    }
    item && apiBody && DB.ref('threads').child(item.key).set(JSON.stringify(Object.assign(body, apiBody))).then(res => {
    }).catch(error => {
      console.log(error)
    })
    setThreadInput && setThreadInput()
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
        />
      </Box>
    </Box>
  )
}

const SubBar = ({ cont }) => {
  return (
    <Box component="div" m={1}>
      <Grid container style={{ flexGrow: 1 }}>
        <Grid item style={{ flexGrow: 1 }}>
          {/* <NewIconButton
            variant='outlined'
            icon='image'
          />
          <NewIconButton
            variant='outlined'
            icon='gif'
          /> */}
        </Grid>
        <Grid item>
          <NewIconButton
            // disabled='false'
            variant='outlined'
            icon='send'
            onClick={() => cont.save()}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
