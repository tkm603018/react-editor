import React, { useState } from 'react';
import SplitPane from 'react-split-pane';

import {
  makeStyles, Paper, Grid, List, Typography
} from '@material-ui/core';

// import './Body.css';
import PaneToolbar from './paneToolbar'
import GenerateContentList from './generateContentList'
import GenerateThreadList from './generateThreadList'
import ContentForm from '../../components/contentForm'
import ThreadForm from '../../components/threadForm'
import { DB } from '../../actions/firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  list: {
    width: '100%',
    height: `${window.innerHeight}px`,
  },
  listBox: {
    height: `${window.innerHeight * 0.73}px`,
    overflowY: 'scroll',
  },
  thread: {
    height: '100vh',
  },
}));

export default ({ contents, setContents,...props }) => {
  const classes = useStyles();
  // const { thread, setThread, input, setInput } = props

  const [threads, setThreads] = useState()
  props = { threads, setThreads, contents, setContents, ...props}

  React.useEffect(() => {
    if(!threads)  {
      DB.ref('threads').on('value', snapshotObj => {
        let data = []
        if (snapshotObj.val()) {
          Object.keys(snapshotObj.val()).forEach((childSnapshotKey) => {
            data.push(JSON.parse(snapshotObj.val()[childSnapshotKey]));
          });
        }
        setThreads(data)
    })}
  }, [])

  return (
    <List className={classes.list}>
      <SplitPane
        split="vertical"
        maxSize={1600}
        minSize={500}
        defaultSize={window.innerWidth * 0.5}
        // defaultSize={parseInt(localStorage.getItem("splitPos"), 10)}
        onChange={(size) => localStorage.setItem("splitPos", size)}
      >
        <div style={{ height: '100%', padding: '0 10px 0 5px' }}>
          <PaneToolbar type={0}></PaneToolbar>
          <ContentForm
            {...props}
          ></ContentForm>
          <Grid container
            className={classes.listBox}
            alignItems="flex-start"
            justify="center"
          >
            <GenerateContentList
              {...props}
            ></GenerateContentList>
          </Grid>
        </div>

        <div style={{ height: '100%', padding: '0 5px 0 10px'}}>
          <PaneToolbar {...props} type={1} title={"Thread  "}></PaneToolbar>
            <ThreadForm
              {...props}
            ></ThreadForm>
            <Grid container
              className={classes.thread}
              alignItems="flex-start"
              justify="center"
            >
              <GenerateThreadList
                {...props}
              ></GenerateThreadList>
            </Grid>
        </div>
      </SplitPane>
    </List>
  )
}
