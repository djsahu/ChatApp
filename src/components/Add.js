import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { styled } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import "../style.css";
import SimpleModal from "./SimpleModal";
import Modal from '@material-ui/core/Modal';
import { LinearProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';




const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '5px solid ##ffffff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
    borderRadius:10,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function getModalStyle() {
  const top = 50;
  const left =50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  
export default function IconLabelButtons(props) {
  const classes = useStyles();
  const [type,setType]=React.useState(false);
  const [name,setName]=React.useState("");
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  
 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div className="One">
      <MyButton variant="contained" color="secondary" className={classes.button}
      onClick={
        
          handleOpen
        }
       >
        New Room
        <AddIcon />
        
      </MyButton>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <div> 
           <h4>Create New Room</h4><hr/>
           <TextField
        id="outlined-textarea"
        label="Room Name"
        placeholder="Be Unique"
        multiline
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={
          (event)=>{
            setName(event.target.value);
            
          }
        }
      />
       <RadioGroup aria-label="position" name="position"  onChange={(event) =>{
           setType(event.target.value)
           
       }} row>
       <FormControlLabel
          value='false'
          control={<Radio name="check"  color="primary" />}
          label="Public"
          labelPlacement="start"
          />

          <FormControlLabel
        value='true'
        control={<Radio name="check" color="primary" />}
        label="Private"
        labelPlacement="start"
      /> </RadioGroup>
           <MyButton
           onClick={
             ()=>{
               console.log(type)
               console.log(name)     
               props.createroom(name,type)
               setOpen(false);
               
             }
           }>Submit</MyButton>
           </div>
        </div>
      </Modal>
      </div>
      )
}  