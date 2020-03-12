import React from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Appbar from "./Appbar"
import AbsApp from "./AbsApp";
import "../style.css"
export default class Messagelist extends React.Component{
    

    render(){
        return(
        <div class="Container">
          {console.log(this.props.roomn)}
         <AbsApp call={this.props.call} adduser={this.props.adduser}roomid={this.props.roomid} roomn={this.props.roomn} st={this.props.st} lvr={this.props.lvr}/>
         <div class="scroll">
             {console.log(this.props.messages)}
             {this.props.messages.map((value,index) => (
             
         <List >
             <ListItem alignItems="flex-start">
              <ListItemAvatar>
                  <Avatar alt="Profile Picture" src="https://previews.123rf.com/images/tanyastock/tanyastock1803/tanyastock180300490/97923644-user-icon-avatar-login-sign-circle-button-with-soft-color-gradient-background-vector-.jpg" />
                </ListItemAvatar>
         <ListItem alignItems="flex-start">
           <ListItemText
             primary={
                <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {console.log(value)}
                  {value.senderId}
                </Typography>
              </React.Fragment>
             }
             secondary={
               <React.Fragment>
                 <Typography
                   component="span"
                   variant="body2"
                   class='messagelist'
                   color="textPrimary"
                 >
                   <b >{value.parts[0].payload.content}</b>
                 </Typography>
               </React.Fragment>
             }
           />
         </ListItem>
         
         
         </ListItem>
         <Divider variant="inset" component="li" />
         </List>
             ))}
            </div>
            </div>
        )
        
    }
}      