import React from 'react';
import Appbar from "../src/components/Appbar"
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import './App.css';
import Messagelist from "../src/components/Messagelist"
import "./style.css";
import Roomlist from './components/Roomlist';
import Add from "../src/components/Add";
import fire from './Fire';
import Zoom from '@material-ui/core/Zoom';
import Info from "./components/Info";


var user;
export default class App extends React.Component{
  
  constructor(props){
    super(props)
    console.log(this.props.name)
    this.state={
      meassages:[],
      mes:'',
      smes:'',
      joinabler:[],
      joined:[],
      roomid:null,
      roomn:'',
      useri:this.props.name,
      st:'',
      ty:false,
      uarr:[this.props.name],
      priv:[],
      count:0,
      snv:false,
      notrn:''

    }
     this.subscribe=this.subscribe.bind(this)
     this.typing=this.typing.bind(this)
     this.adduser=this.adduser.bind(this)
     this.createroom=this.createroom.bind(this)
     this.check=this.check.bind(this)
     this.leaveroom=this.leaveroom.bind(this)
     this.handle_C=this.handle_C.bind(this)
  }

  componentWillReceiveProps(){
    console.log(this.state.name);
  }
  componentDidMount(){
    
    const chatManager = new ChatManager({
      
      instanceLocator: "v1:us1:54cea947-7b88-4f8b-a57f-d95a2b9ac5d4",
      userId:this.state.useri,
      tokenProvider: new TokenProvider({ url:"https://us1.pusherplatform.io/services/chatkit_token_provider/v1/54cea947-7b88-4f8b-a57f-d95a2b9ac5d4/token"})
    })
    chatManager.connect().then(currentUser => {
      
      console.log(currentUser);
      this.currentUser=currentUser
      this.getroom()

      
  })
}
getroom(){ 
this.currentUser.getJoinableRooms().then(joinableRooms  =>{
  this.setState({
    joinabler:joinableRooms,
    joined:this.currentUser.rooms
  })
})
}
subscribe(roomid,user){
  this.setState({
    meassages:[]
  })
  this.currentUser.subscribeToRoomMultipart({
    roomId:roomid,
    hooks:{
      onMessage:message =>{
        this.setState({
          messages: this.state.meassages.push(message)
          
          

        })
        if(message.senderId!=this.state.userid){
          this.setState({
            count:this.state.count + 1
          })
        }
      },
      onUserStartedTyping: user => {
        this.setState({
         st:user.name+" " + "is typing....."})
      },
      onUserStoppedTyping: user => {
        this.setState({
          st:''
        })
      }
    }
  }).then(room => {
      this.getroom()
      this.setState({
        roomid:roomid,
        roomn:room.name
      })
  })
 }
 adduser(username,roomid){
   console.log(username)
   user=username
  this.currentUser.addUserToRoom({
    userId: username,
    roomId: roomid
  })
    .then(() => {
         
      this.call(`You Added ${user} to  Group:'${this.state.roomn}'`)
    })
    .catch(err => {
      this.call(`Could not Add ${user} to  Group:'${this.state.roomn}'`)
    })
 
  }
  check(type){
      if(type=='true'){
      this.setState({
        ty:true
      })
    
  }
}
str2bool(value) {
  if (value && typeof value === 'string') {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return value;
}
leaveroom(roomid){
  this.currentUser.leaveRoom({ roomId: roomid })
  .then(room => {
    this.getroom()
    this.call(`You left  Group:'${this.state.roomn}'`)
    this.setState({
      meassages:[],
      roomn:'',
      priv:[]

    })

  })
  .catch(err => {
    alert(`Error leaving room  ${err}`);
  })
}
  createroom(name,type){
      console.log(name)
    if (type=='true'){
      this.setState({
        private:this.state.priv.push(name)
      })
    }
    this.currentUser.createRoom({
    
    id: name,
    name: name,
    private: this.str2bool(type),
    addUserIds: this.state.uarr,
    customData: {},
  }).then(room => {
      this.getroom()
  })
  .catch(err => {
    alert("Please Be Unique");
    console.log(JSON.stringify(err));
  })
}
 sendmessage(text){
  this.currentUser.sendMessage({
  text,
  roomId: this.state.roomid
}).then(()=>{})
}
typing(){
this.currentUser.isTypingIn({ roomId: this.state.roomid })
  .then(() => {
  })
  .catch(err => {
    console.log(`Error sending typing indicator: ${err}`)
  })  
}
call(mes){
  this.setState({
    snv:true,
    notrn:mes
  })
}
handle_C(){
  this.setState({
    snv:false
  })
}
  render(){
    var d=false
    if(this.state.roomn==''){
         d=true
    }
    console.log(this.props.name)
    return(
      <div class="place">
        <div className="fix">
      <Appbar/>
      
      </div>
      {console.log(this.state.roomn)}
      {console.log(this.state.priv)}
      <Zoom in={true} style={{ transitionDelay: true ?  '0ms' :'5000ms' }}>
       <Roomlist count={this.state.count} priv={this.state.priv} subscribe={this.subscribe} joinable={this.state.joinabler} joined={this.state.joined}/>   
       </Zoom>
       <Messagelist call={this.call} adduser={this.adduser} lvr={this.leaveroom} st={this.state.st} roomn={this.state.roomn} messages={this.state.meassages} roomid={this.state.roomid}/>
        <div className="blue"><Add createroom={this.createroom} check={this.check}/></div>
        <div className="red">
            <input className="input"
            onChange={(event)=>{
              {console.log(this.state.mes)}
              this.typing()
              this.setState({
                mes:event.target.value
            })
            }}
            value={this.state.mes}
            placeholder="Enter your message" 
            disabled={d}
            onKeyPress={
              (event)=>{
                var code=event.keyCode || event.which;
                {console.log(code)}
                {console.log(this.state.mes)}
                if(code==13){
                  this.sendmessage(this.state.mes)
                  this.setState({
                    mes:''
                  })
              }
              {console.log(this.state.smes)}
            }

            }/>
        </div>
        {this.state.snv?<Info ch={this.state.snv} handle_C={this.handle_C} er={this.state.notrn}/>:''}
        </div>
    )
    
  }

}