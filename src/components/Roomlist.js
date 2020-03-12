import React,{Component} from "react";
import "../style.css";
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

export default class Roomlist extends Component{
    render(){
        return(
            <div className="roomlist">
                <div className='join-room'>
                <Paper elevation={0}>
        <Breadcrumbs separator="-" aria-label="Breadcrumb">
          <Link color="inherit" href="#" >
            Joinable Rooms
          </Link>
        </Breadcrumbs>
      </Paper>
                {  
                    this.props.joinable==[]?"No more rooms to join":
                    this.props.joinable.map(value =>{
                        return(
                            <div>
                        <div className="roomdisp">
                            <a href={value.name}
                            onClick={(event) => {
                                event.preventDefault()
                                this.props.subscribe(value.id) 
                                console.log(value.id) 
                            }}>#{value.name}
                            </a></div>
                        </div> )  
                    })
                } 
                </div><br/><br/>
                <div className='joinable-room'>
                <Paper elevation={0}>
        <Breadcrumbs separator="-" aria-label="Breadcrumb">
          <Link color="inherit" href="#">
            Joined Rooms
          </Link>
        </Breadcrumbs>
      </Paper>
                 {
                    this.props.joined==[]?"No rooms joined":
                    this.props.joined.map(value =>{
                        return(
                        <div className="roomdisp">
                            <a href={value.name}
                            onClick={(event) => {
                                event.preventDefault()
                                this.props.subscribe(value.id) 
                                console.log(value.id) 
                            }}>#{value.name}</a>

                         </div> )  
                    }) 
                 }
                 </div><br/><br/>
                <div className='join-room'>
                   <Paper elevation={0}>
                  <Breadcrumbs separator="-" aria-label="Breadcrumb">
          <Link color="inherit" href="#" >
            Private Rooms
          </Link>
        </Breadcrumbs>
      </Paper>
      {
                    this.props.priv==[]?"No rooms joined":
                    this.props.priv.map(value =>{
                        return(
                        <div className="roomdisp">
                            <a href="#"
                            onClick={() => {
                                this.props.subscribe(value) 
                            }}>#{value}</a>

                        </div> )  
                    }) 
                 }
                </div>
            </div>
        )
    }
}