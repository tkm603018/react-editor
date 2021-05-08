import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import {
  Drawer, Divider, List, ListItem, ListItemIcon,
  Tooltip, ListItemText, Icon,
  FormControlLabel, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';

import {
  Inbox as InboxIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

import Transitions from './Transitions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  details: {
    alignItems: 'center',
  },

  expandIcon: {
    flexDirection: 'row-reverse',
  }
}));


export default ({ body, ...props }) => {
  const { open, items, setItems } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <List>
          <ListItem>
            <ListItemIcon style={{flexGrow: 1}}>
              <AccordionSummary
                expandIcon={
                  <Tooltip title={'items'} placement='right-end' arrow>
                    <ExpandMoreIcon />
                  </Tooltip>
                }
                aria-controls="panel1c-content"
                id="panel1c-header"
                className={classes.expandIcon}
                IconButtonProps={{ edge: 'start' }}
                style={{minHeight: '0px', padding: '0px'}}
              >
              </AccordionSummary>
            </ListItemIcon>
            <ListItemIcon
              style={{minWidth: '43px'}}
            >
              <Transitions></Transitions>
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        {body && body}
      </Accordion>
    </div>
  );
}
