import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import {
  CssBaseline, Button, Icon, IconButton
} from '@material-ui/core';

import {
  MoreHoriz as MoreHorizIcon
} from '@material-ui/icons';

import Form from './Form'
import NewIconButton from '../../components/newIconButton'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default ({ type, i, item, content }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const item = data && data[i]

  const handleChange = () => {
    setOpen(!open)
  }

  return (
    <div>
      {(item || content) ?
        <NewIconButton icon={type === 'edit' ? 'edit' : 'add'} onClick={handleChange} /> :
        <NewIconButton icon='add'onClick={handleChange}/>
      }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleChange}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 1000,
        // }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
            {open && <Form
              // i={i}
              item={item}
            ></Form>}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
