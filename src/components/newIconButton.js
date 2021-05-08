import React from "react";

import {
  Icon, makeStyles, IconButton,
} from '@material-ui/core'

const MAX_CHARS_ALLOWED = 50;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    flexGrow: 1,
    display: 'flex',
    // border: `1px solid ${theme.palette.divider}`,
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
}));


export default ({ icon, color, edge, size, onClick, render, ...props }) => {

  return (
    <IconButton
      color={color || 'default'}
      // edge={edge || 'start'}
      size={size || 'medium'}
      onClick={onClick}
      {...props}
    >
      <Icon>{icon || 'add'}</Icon>
      {render && render}
    </IconButton>
  );
}
