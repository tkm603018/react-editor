import React, {useEffect, useRef, useState, useMemo}from 'react'
import firebase from "firebase/app";

import {
  makeStyles, Paper, Grid, List, Box,
  Divider, Typography, Button, IconButton,
  Tooltip, MenuItem, ListItem, Icon,
  Snackbar, ListItemText,
  GridList, GridListTile, GridListTileBar
} from '@material-ui/core'

import Alert from '@material-ui/lab/Alert'

import {
  Close as CloseIcon,
} from '@material-ui/icons'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import MUIRichTextEditor from "mui-rte"
// import newTextField from '../components/newTextField'

// import newSelectableAssets from './molecules/forms/newSelectableAssets'

// import newRichDraft from './newRichDraft/contentIndex'
// import { DB, storage } from '../actions/firebase'

// import NewIconButton from './newIconButton'

const useStyles = makeStyles((theme) => ({
  singleLineGridList: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}))

export default ({
  // classes, 
}) => {
  const classes = useStyles()
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const [media, setMedia] = useState()
  const [localMedia, setLocalMedia] = useState([])

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const handleSelectImage = (url) => {
    setLocalMedia(localMedia && localMedia.filter((x) => { return !(x === url) }))
  }


const SubBar = ({ cont, handleClick }) => {
  return (
    <Box component="div" m={1}>
      <Grid item className={classes.singleLineGridList}>
        <GridList className={classes.gridList} cols={5}>
          {localMedia && localMedia.map((url) => {
            return ( 
              <GridListTile key={url} style={{ width: '300px', height: '200px' }}>
                <img src={url} alt={url} />
                <GridListTileBar
                  title={url}
                  classes={{
                    singleLineGridList: classes.titleBar,
                    title: classes.title,
                  }}
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
  
}


