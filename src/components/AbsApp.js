import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import "../style.css"
import Adduser from "./Adduser";

const useStyles = makeStyles(theme => ({
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color:'0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));
  const MyApp = styled(AppBar)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    top:0,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 54,
    padding: '0 30px',
    
  }); 
  
  export default class AbsApp extends React.Component{
    render(){
      var d=false
      if(this.props.roomn==''){
      d=true
      }
     
          return(
            
                <div className="Appbar">
                  <MyApp position="relative" id="app">
                  <Typography  class="pos"  noWrap>
                    {this.props.roomn}:{this.props.st}
                  </Typography>
    
                  <div class="new">        
        <IconButton id='rmv'
        disabled={d}
        color="inherit"
        onClick={()=>{
          
          this.props.lvr(this.props.roomid)
        }}>
          <DeleteIcon />
          
        </IconButton>
        </div>
        <div class="new1"> 
        <Adduser adduser={this.props.adduser} roomid={this.props.roomn} d={d}/>
        </div> 
       </MyApp>
              
                  
      </div>
          )
      }
    }