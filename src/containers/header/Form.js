import React, { useState } from 'react'
import arrayMove from 'array-move'
import { Container, Draggable } from 'react-smooth-dnd'


import {
  Drawer, Divider, List, ListItem, ListItemIcon,
  ListItemText, ListItemSecondaryAction,
  Tooltip, AppBar, Typography, IconButton,
  CssBaseline, Button, Grid, Box, TextField, Paper,
  FormControl, FormHelperText, MenuItem, InputLabel,
  Select,
  makeStyles, withStyles, Icon
} from '@material-ui/core'


import {
  Inbox as InboxIcon,
  Mail as MailIcon,
  DragHandle as DragHandleIcon,
  Settings as SettingsIcon,
  Adjust as AdjustIcon
} from '@material-ui/icons'

import {NavListsContainer} from '../../actions/navLists/index'
import newTextField from '../../components/newTextField'
  

const Icons = [
  "inbox",
  "mail",
  "drag_handle",
  "settings",
]
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
    paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const Form = ({item}) => {
  const classes = useStyles()
  const cont = NavListsContainer.useContainer()
  const onSubmit = () => {
    item ? cont.ItemUpdate({item}) : cont.ItemAdd()
  }

  return (
    <Box component="div" m={2}>
      <form onSubmit={onSubmit}>
        <FormControl className={classes.formControl} >
        <div spacing={2}>
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              {newTextField({
                id: "filled-textarea",
                default: (item && item.id) || "", label: "Id",
                fullWidth: false, required: false,
                disabled: false,
                value: cont.id || (item && item.id),
                onChange: cont.setId,
                variant: "outlined",
              }).render}
            </FormControl>
          </Grid>
          <Grid item xs={2}>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Icon</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                defaultValue={item && item.icon}
                value={cont.icon || (item && item.icon)}
                onChange={(e)=> cont.setIcon(e.target.value)}
                label="Icon"
                fullWidth
              >
                <MenuItem value='None'>
                  <em>None</em>
                </MenuItem>
                {
                  Icons.map((x, i) => {
                    return(
                      <MenuItem
                        value={x}
                        key={i}
                      >
                        {x ? <Icon>{x}</Icon> : <AdjustIcon />}
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              {newTextField({
                id: "filled-textarea",
                default: (item && item.name) || "", label: "Name",
                fullWidth: false, required: false,
                disabled: false,
                value: cont.name,
                onChange: cont.setName,
                variant: "outlined",
              }).render}
            </FormControl>
          </Grid>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type='submit'
            fullWidth
          >
            Submit
          </Button>
        </div>
        </FormControl>
      </form>
    </Box>
  )
}

export default ({ item }) => {
  return (
    <NavListsContainer.Provider>
      <Box component="div" m={2} style={{flexGrow: 1}}>
        <Form
          item={item}
        ></Form>
      </Box>
    </NavListsContainer.Provider>
  )
}
