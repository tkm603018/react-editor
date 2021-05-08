import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import parse from 'html-react-parser'

import {
  makeStyles, Paper, Grid, List, Box
} from '@material-ui/core';

import { DB } from '../../actions/firebase'
import './Body.css';
import PaneToolbar from './paneToolbar'
import GenerateContentList from './generateContentList'
import ContentForm from '../../components/contentForm'

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.
Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.
 `

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // overflow: 'hidden',
    padding: theme.spacing(0, 3),
    height: '100%',
  },
  paper: {
    maxWidth: '100%',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  list: {
    maxHeight: '1230px',
    // position: 'absolute',
    // bottom: '0px',
  },
  listBox: {
    width: '100%',
    height: '950px',
    overflowY: 'scroll',
    // flexDirection: 'column-reverse',
  }
}));

export default ({ ...props }) => {
  const {threads, setThreads, contents, setContents, thread, setThread, contentInput, setContentInput, threadInput, setThreadInput} = props
  const classes = useStyles()

  return (
    <List className={classes.list}>
      <PaneToolbar setThread={setThread} type={0}></PaneToolbar>
      <ContentForm {...props}></ContentForm>
      <Grid container
        className={classes.listBox}
        // style={{}}
        alignItems="flex-start"
        justify="center"
        // direction="row-reverse"
      >
        <GenerateContentList
          {...props}
        ></GenerateContentList>
      </Grid>
    </List>
  )
}
