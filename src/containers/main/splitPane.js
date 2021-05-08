import React, { useState } from 'react';
import SplitPane from 'react-split-pane';

import {
  makeStyles, Paper, Grid, List, Typography
} from '@material-ui/core';

import './Body.css';
import PaneToolbar from './paneToolbar'
import GenerateContentList from './generateContentList'
import GenerateThreadList from './generateThreadList'
import ContentForm from '../../components/contentForm'
import ThreadForm from '../../components/threadForm'
import { DB } from '../../actions/firebase'

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.
Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.
 `

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: '100%',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  list: {
    height: '1210px',
  },
  listBox: {
    height: '950px',
    // maxHeight: '910px',
    width: '100%',
    overflowY: 'scroll',
  },
  thread: {
    height: '950px',
    // maxHeight: '910px',
    width: '100%',
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
      <SplitPane split="vertical" defaultSize="60%" primary="first">
        <div style={{ height: '100%', width: '100%', padding: '0 10px 0 5px' }}>
          <PaneToolbar type={0}></PaneToolbar>
          <ContentForm
            {...props}
          ></ContentForm>
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
        </div>

        <div style={{ height: '100%', width: '100%', padding: '0 5px 0 10px', }}>
          <PaneToolbar {...props} type={1} title={"Thread  "}></PaneToolbar>
          <div style={{ overflowY: 'scroll', }}>
            <ThreadForm
              {...props}
            ></ThreadForm>
            <Grid container
              className={classes.thread}
              // style={{}}
              alignItems="flex-start"
              justify="center"
              // direction="row-reverse"
            >
              <GenerateThreadList
                {...props}
              ></GenerateThreadList>
            </Grid>
          </div>
        </div>
      </SplitPane>
    </List>
  )
}
