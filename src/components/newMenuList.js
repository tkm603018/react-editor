import React, {useEffect, useRef, useState, useMemo}from 'react'
import parse from 'html-react-parser'

import InfiniteScroll  from 'react-infinite-scroller'

import {
  makeStyles, Paper, Grid, Menu, IconButton, Icon, MenuItem
} from '@material-ui/core';

import NewIconButton from './newIconButton'
import Transitions from '../containers/header/Transitions'
import { DB } from '../actions/firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    maxWidth: '100%',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  content: {
    anchorLink: {
      textDecoration: 'none'
    },
  },
  date: {
    color: '#868686',
  }
}));


export default ({ table, i, item, setThread }) => {
  const classes = useStyles();
  const [itemId, setItemId] = useState(null)
  // const items = data && data.slice().reverse()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = ({e, i}) => {
    if (anchorEl !== e.currentTarget) {
      setAnchorEl(e.currentTarget)
      setItemId(i)
      // console.log("hover", i)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setItemId(null)
  }

  // console.log("item", item)
  return(
    <div>
      <IconButton
        key={i}
        aria-owns={(itemId === i && anchorEl) ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={(e) => handleClick({e, i})}
        // onMouseOver={(e) => handleClick({e, key})}
      >
        <Icon>more_vert_outlined</Icon>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: 50
        }}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <MenuItem
          onClick={() => onDelete({table, key: item.key})}
          style={{ color: '#e01e5a' }}>
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose}>Infomation</MenuItem>
      </Menu>
    </div>
  )
}

const onDelete = ({ table, key }) => {
  console.log('DELETE CALL KEY', table, key)
  key && DB.ref(table).child(key).remove().then(res => {
      console.log("Delete item", res)
    }).catch(error => {
      console.log(error)
    })
    // item.link && DB.ref('bodies-' + item.link).remove().then(res => {
    // }).catch(error => {
    //   console.log(error)
    // })
}
