import React, {useEffect, useRef, useState, useMemo}from 'react'
import parse from 'html-react-parser'

import InfiniteScroll  from 'react-infinite-scroller'

import {
  makeStyles, Paper, Tooltip, Menu, IconButton, Icon, MenuItem
} from '@material-ui/core';

import NewIconButton from './newIconButton'
import NewMenuList from '../components/newMenuList'
import Transitions from '../containers/header/Transitions'

import contentForm from '../components/contentForm'
import { DB, storage } from '../actions/firebase'

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

export default ({ type, i, item, ...props }) => {
  const {threads, setThreads, contents, setContents, thread, setThread, contentInput, setContentInput, threadInput, setThreadInput} = props

  const [itemId, setItemId] = useState(null)

  const [anchorEl, setAnchorEl] = useState(null)

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

  const renderItem = (
    <div>
      <IconButton
        key={i}
        aria-owns={(itemId === i && anchorEl) ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={(e) => handleClick({e, i})}
        onMouseOver={(e) => handleClick({e, i})}
      >
        <Icon>menu</Icon>
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
      <Tooltip title='編集する' placement='left' arrow>
        <MenuItem>
          <Transitions
            type='edit'
            i={i}
            item={item}
          />
        </MenuItem>
      </Tooltip>
      <Tooltip title='その他' placement='left' arrow>
        <MenuItem>
          <NewMenuList
            table='items'
            i={i}
            item={item}
          />
        </MenuItem>
      </Tooltip>
      </Menu>
    </div>
  )


  const renderContent = (
    <div>
      <IconButton
        key={i}
        aria-owns={(itemId === i && anchorEl) ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={(e) => handleClick({e, i})}
        onMouseOver={(e) => handleClick({e, i})}
      >
        <Icon>menu</Icon>
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
        {
          <Tooltip title='スレッドを開く' placement='left' arrow>
            <MenuItem>
              <NewIconButton
                icon='question_answer_outlined'
                onClick={() => setThread(item.key)}
                />
            </MenuItem>
          </Tooltip>
        }
        <Tooltip title='編集する' placement='left' arrow>
          <MenuItem>
            <NewIconButton
              icon='edit'
              onClick={() => setContentInput(item)}
            />
            </MenuItem>
        </Tooltip>
        <Tooltip title='その他' placement='left' arrow>
          <MenuItem>
            <NewMenuList
              table='contents'
              i={i}
              item={item}
            />
          </MenuItem>
        </Tooltip>
      </Menu>
    </div>
  )

  const renderThread = (
    <div>
      <IconButton
        key={i}
        aria-owns={(itemId === i && anchorEl) ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={(e) => handleClick({e, i})}
        onMouseOver={(e) => handleClick({e, i})}
      >
        <Icon>menu</Icon>
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
        {/* {!thread && <MenuItem>
          <NewIconButton
            icon='question_answer_outlined'
            onClick={() => setThread(item.key)}
          />
        </MenuItem>} */}
        <Tooltip title='編集する' placement='left' arrow>
          <MenuItem>
            <NewIconButton
              icon='edit'
              onClick={() => setThreadInput(item)}
            />
          </MenuItem>
        </Tooltip>
        <Tooltip title='その他' placement='left' arrow>
          <MenuItem>
            <NewMenuList
              table='threads'
              i={i}
              item={item}
            />
          </MenuItem>
        </Tooltip>
      </Menu>
    </div>
  )
  return type === 'items' ? renderItem : (type === 'contents' ? renderContent : renderThread)
}
