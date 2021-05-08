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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0, 3),
    height: '100%',
  },
  list: {
    height: `${window.innerHeight}px`,
  },
  listBox: {
    width: '100%',
    height: `${window.innerHeight * 0.73}px`,
    overflowY: 'scroll',
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
        alignItems="flex-start"
        justify="center"
      >
        <GenerateContentList
          {...props}
        ></GenerateContentList>
      </Grid>
    </List>
  )
}
