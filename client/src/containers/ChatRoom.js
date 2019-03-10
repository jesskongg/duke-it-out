import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import UserList from '../components/UserList';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import Message from "../components/Message";
import Button from "../components/Button";

import './ChatRoom.css';
import moment from 'moment-timezone';
import { HOST_STRING } from '../helper/api-config';

let socket;
let roomInfo;

class ChatRoom extends Component {
  state = {
    messageList: []
  }

	constructor(props) {
    super(props);
    if (!this.props.location.state){
      this.props.history.goBack();
    } else {
      roomInfo = this.props.location.state.roomInfo;
      this.getPreviousMessages();
      socket = io();
      socket.on('connect', () => {
        socket.emit('clientInfo', this.props.userInfo, roomInfo);
      });
      socket.on('verified message', (msg, date, userInfo) => {
        this.setState({messageList: [...this.state.messageList, {body: msg, date: date, userInfo: userInfo}]});
      });
      if (roomInfo == null) {
        // TODO: handle in better way
        this.state = {
          roomName: "Raptors vs Bulls",
          leftTeam: {
            title: "Raptors",
            members: ["John", "Andrew", "Bob"]
          },
          rightTeam: {
            title: "Bulls",
            members: ["Andy", "Kyle"]
          },
          currentMsg: '',
          messageList: []
        };
      } else {
        const teamMembers = this.getTeamMembers(roomInfo.id);
        this.state = {
          roomName: roomInfo.name,
          leftTeam: {
            title: roomInfo.team1,
            members: ["John", "Andrew", "Bob"]
          },
          rightTeam: {
            title: roomInfo.team2,
            members: ["Andy", "Kyle"]
          },
          currentMsg: '',
          messageList: []
        };
      }
    }
	}

  getPreviousMessages() {
	  fetch(HOST_STRING + "/api/message/room/" + roomInfo.id)
      .then(res => {
        if (!res.ok){
          alert(res.status + "\n" + res.statusText);
          throw "Failed to sign up";
        }
        else {
          return res.json();
        }
    }).then(data => {
      var self = this;
      data.forEach(val => {
        var currUserInfo = {
          id: val.creator_id,
          username: val.username,
          email: val.email};
        self.setState({messageList: [...self.state.messageList,
            {body: val.message, date: val.timestamp, userInfo: currUserInfo}]});
      })
    }).catch(error => {
        console.log(error);
      });
	}

  sendMessage = (event) => {
		event.preventDefault();
		if (this.props.isLoggedIn) {
      socket.emit('sent message', this.state.currentMsg, new moment().format(), this.props.userInfo, roomInfo.id);
      this.setState({currentMsg: ''});
    } else {
		  alert("You must be logged in to send a message!");
    }
	};

  handleChangeMessage = event => this.setState({currentMsg: event.target.value});
  
  onSelectTeam = (name) => {
    const payload = {
      roomId: roomInfo.id,
      userId: this.props.userInfo.id,
      teamName: name
    }

    // console.log(payload);
    fetch("http://localhost:5000/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(res => {
      // console.log(res);
    })
  }

  getTeamMembers = roomId => {
    fetch("http://localhost:5000/api/chat/" + roomId + "/users", {mode: "cors"})
    .then(res => {
      console.log(res.users);
    })
  }

	
	componentWillUnmount() {
		socket.disconnect();
	}

	render () {
    let messages = this.state.messageList;
		return (
			<div className="container-body">
				<div className="d-flex justify-content-center h-100">
					<div className="userlist">
						<UserList team={this.state.leftTeam}/>
            <Button text={"Select"} team={roomInfo.team1} onSelectTeam={this.onSelectTeam.bind(this)} />
					</div>
					<div className="chatbox">
						<Header title={this.state.roomName} header_type="chat"/>
						<div id="msgBox" className="msgBoxStyle">
							{this.state.messageList.slice(0).reverse().map((message, index) => (
							<Message body={ message.body } date={ message.date } senderInfo={message.userInfo} />
							))}
						</div>
						<MessageInput value={this.state.currentMsg} onSubmitEvent={this.sendMessage}
              onChangeValue={this.handleChangeMessage} isLoggedIn={this.props.isLoggedIn}/>
					</div>
					<div className="userlist">
						<UserList team={this.state.rightTeam}/>
            <Button text={"Select"} team={roomInfo.team2} onSelectTeam={this.onSelectTeam.bind(this)} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    isLoggedIn: state.isloggedIn
  }
};

export default connect(mapStateToProps, null)(ChatRoom);