import React, {useEffect, useRef, useState, useMemo}from 'react'
import parse from 'html-react-parser'

import {
  makeStyles, Paper, Grid, Menu, IconButton, Icon, MenuItem
} from '@material-ui/core';

import NewIconButton from '../../components/newIconButton'
import NewHoverActions from '../../components/newHoverActions'
import { filter } from 'minimatch';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowY: 'scroll',
  },
  paper: {
    maxWidth: '100%',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  content: {
    anchorLink: {
      textDecoration: 'none',
    },
    '& a': {
      color: '#f48fb1'
    },
  },
  date: {
    color: '#868686',
  }
}));

export default ({ ...props }) => {
  const {threads, setThreads, contents, setContents, thread, setThread, contentInput, setContentInput, threadInput, setThreadInput} = props
  const classes = useStyles();
  const [itemId, setItemId] = useState(null)
  const items = threads && threads.filter((x) => {if (x.threadKey === thread) return threads}).slice().reverse()

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = ({e, i}) => {
    if (anchorEl !== e.currentTarget) {
      setAnchorEl(e.currentTarget)
      setItemId(i)
      console.log("hover", i)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setItemId(null)
  }

  return(
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs>
          {!items ? null : items.map((item, i) => {
            return (
              <Paper key={i}
                className={classes.paper}
              >
                <Grid container wrap="nowrap" spacing={0}>
                    <small className={classes.date}>
                      {/* {String(item.date_at.year)}年
                      {String(item.date_at.month)}月
                      {String(item.date_at.date)}日 */}
                      {String(item.date_at.hours)}:
                      {String(item.date_at.minutes)}
                      /{i}/
                    </small>
                  <Grid item xs className={classes.content}>
                    {parse(item.content)}
                  </Grid>
                  <NewHoverActions
                    type='threads'
                    i={i}
                    item={item}
                    {...props}
                  />
                </Grid>
              </Paper>
            )
          })
          }
        </Grid>
      </Grid>
    </div>
  )
}
