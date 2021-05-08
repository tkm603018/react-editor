import React, { useState, useEffect } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import arrayMove from 'array-move';

import {
  Drawer, Divider, List, ListItem, ListItemIcon,
  ListItemText, ListItemSecondaryAction,
  Tooltip, AppBar, Typography, IconButton,
  CssBaseline, Button, Link, Box, Icon
} from '@material-ui/core';

import {
  Inbox as InboxIcon,
  Mail as MailIcon,
  DragHandle as DragHandleIcon,
  Settings as SettingsIcon,
  MoreHoriz as MoreHorizIcon,
  Adjust as AdjustIcon
} from '@material-ui/icons';


import { DB } from '../../actions/firebase'
import { NavListsContainer } from '../../actions/navLists/index'

import Accordion from './Accordion'
import Transitions from './Transitions'
import NewHoverActions from '../../components/newHoverActions'

const SortableList = ({ ...props }) => {
  const cont = NavListsContainer.useContainer()
  const { open, items, setItems } = props
  
  React.useEffect(() => {
    if (!(cont.items === items)) {
      console.log("useEffect", items)
      cont.setItems(items)
    }
  },[items])

  const onDrop = ({ removedIndex, addedIndex }) => {

    if (removedIndex !== addedIndex) {
      setItems(items => {
        // console.log("items", items, data)

        const a = {
          key: items[removedIndex].key,
          id: String(addedIndex + 1),
          icon: items[removedIndex].icon,
          name: items[removedIndex].name,
        }
        const b = {
          key: items[addedIndex].key,
          id: String(removedIndex + 1),
          icon: items[addedIndex].icon,
          name: items[addedIndex].name,
        }

        cont.ItemIdChangeUpdate({ item: a })
        cont.ItemIdChangeUpdate({ item: b })

        arrayMove(items, removedIndex, addedIndex)
      })
    }
  }

  return (
    <div>
      <List>
        <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
          {!items ? null : items.sort((a, b) => {
            if (a.id < b.id) { return -1 } else return 1
          }).map((item, i) => (
            <Draggable key={i}>
              <ListItem button
                key={i}
                className="drag-handle">
                <ListItemIcon>
                  <Tooltip title={item.name} placement='right-end' arrow>
                    <Icon>{item.icon}</Icon>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {/* <Transitions
                  i={i}
                  data={data}
                  setData={setData}
                ></Transitions> */}
                <NewHoverActions
                  type='items'
                  i={i}
                  key={item.key}
                  item={item}
                  setItems={setItems}
                />
              </ListItem>
            </Draggable>
          ))}
        </Container>
      </List>
    </div>
  );
};

export default ({ open }) => {
  const [items, setItems] = useState()
  const props = { open, items, setItems }

  useEffect(() => {
    if(!items)  {
      DB.ref('items').on('value', snapshotObj => {
        let data = []
        if (snapshotObj.val()) {
          Object.keys(snapshotObj.val()).forEach((childSnapshotKey) => {
            data.push(JSON.parse(snapshotObj.val()[childSnapshotKey]));
          });
        }
        setItems(data)
    })}
  },[])
  
  // console.log("data", data)

  return (
    <NavListsContainer.Provider>
      <Divider />
      <Accordion
        body={<SortableList {...props}></SortableList>}
        {...props}
      ></Accordion>
      <ListItem>
        <Button href="/nav-list-setting">
        <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary={'Setting'} />
        </Button>
      </ListItem>
    </NavListsContainer.Provider>
  )
}
