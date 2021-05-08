import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

import { DB, storage } from '../../actions/firebase'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));


const CloseButton = ({setThread}) => {
  return (
    <IconButton
      aria-label="show 4 new mails" color="inherit"
      onClick={(e) => setThread(!e)}
    >
      <ClearOutlinedIcon></ClearOutlinedIcon>
    </IconButton>
  )
}

const InfoButton = () => {

  return (
    <IconButton aria-label="show 4 new mails" color="inherit">
      <InfoIcon />
    </IconButton>
  )
}

export default ({ type, title, ...props }) => {
  const classes = useStyles();
  const { contents, setContents, thread, setThread, contentInput, setContentInput, threadInput, setThreadInput } = props
  
  return (
    <div className={classes.grow}>
      <AppBar position="static" color='inherit'>
        <Toolbar>
          <Typography className={classes.title} variant={'h6'} noWrap>
            {title || "#Main  "}
            {/* { thread || ''} */}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {type == 0 ?
              <InfoButton></InfoButton> :
              <CloseButton setThread={setThread}></CloseButton>}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
