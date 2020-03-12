import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { styled } from '@material-ui/styles';
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const[uid,setUid]=React.useState('')

  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    top:0,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 30,
    padding: '0 30px',
    
  }); 
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <IconButton 
        color="inherit"
        onClick={handleClickOpen}
        disabled={props.d}>
         <AddIcon/>
        </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a New Memeber to '{props.roomid}'</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Userid"
            type="email"
            fullWidth
            onChange={
                (event)=>{
                   setUid(event.target.value)
                }
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <MyButton onClick={
            ()=>{    props.adduser(uid,props.roomid) 
                setOpen(false);
              } }color="primary">
            Subscribe
          </MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}