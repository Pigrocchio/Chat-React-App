import React from 'react';
import io from 'socket.io-client'
import AnimalAvatar from 'animal-avatars.js'

const PORT = process.env.PORT || 5000


export const CTX = React.createContext();

// Create Avatar
let myAvatar = new AnimalAvatar();
let profileImage =  myAvatar.getAvatarUrl();
console.log(profileImage);

let avatar2 = new AnimalAvatar();
let profileImage2 = avatar2.getAvatarUrl();
console.log(profileImage2);

const initState = {
  user: false,
  nickname: [{ from: "", avatar: profileImage2 }],
  chat: {
    general: [{ from: "Gino", msg: "ciao", avatar: profileImage }],
    holidays: [
      { from: "Gino", msg: "ciao", avatar: profileImage },
      { from: "Carlo", msg: "ciao", avatar: profileImage},
      { from: "Giulio", msg: "ciao", avatar: profileImage}
    ]
  }
};

function reducer (state, action) {
  const { from, msg, topic, avatar } = action.payload;
  console.log(topic)
  
    switch (action.type) {
      case "RECEIVE_MESSAGE":
        return {
          ...state,
          chat: {
            ...state.chat,
            [topic]: [
              ...state.chat[topic],
              { from, msg, avatar }
            ]
          }

          // [topic]: [...state.chat[topic],{ from, msg }],

          // chat: { [topic]:  [{ from, msg }]  }

          // [topic]: [...state[topic, { from, msg }]
        };
      case "USER_NAME":
        console.log('Reducer' + from)
        return {
          ...state,
          user: true,
          nickname: [
            ...state.nickname,
            {
              
              ...state.nickname[0], 
              from,
              
              
            }
          ]
        };
            
               default:
        return state;
    }
    
} 

function sendChatAction(value) {
    socket.emit('chat msg', value)
}



function sendNameAction(value) {
    socket.emit('user name', value)
    
}

let socket

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  // useReducer allow to functional component access to reducer functions from the state managment
   
    
  if (!socket) {
    socket = io(`:${PORT}`);
      
    socket.on("chat msg", function(msg) {
      console.log('MSG del socket di ritorno' + msg);
      console.log("MSG del socket di ritorno" + JSON.stringify(msg));
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
      
      socket.on("user name", function(from) {
        console.log('ante dispatch' + from);
          dispatch({ type: "USER_NAME", payload: { from } });
      });

  }

  

  return <CTX.Provider value={{ allChats, sendChatAction, sendNameAction, profileImage, profileImage2 }}>{props.children}</CTX.Provider>;
}