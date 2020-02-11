import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from '@material-ui/core/Chip';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";


import {CTX} from './Store'



const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  topicWindow: {
    width: "30%",
    height: "300px",
    borderRight: "solid 1px grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
    overflow: "auto"
  },
  chatBox: {
    width: "85%"
  },

  chip: {
    margin: "5px",
    color: "white"
  },

  button: {
    width: "15%"
  }
}));

export default function Dashboard() {
  const classes = useStyles();

    // const ConsoleLog = ({ children }) => {
    //   console.log(children);
    //   return false;
    // };  
    
    // CTX STORE

  const { allChats, sendChatAction } = React.useContext(CTX);
  
  
  
  const topics = Object.keys(allChats.chat)
  console.log('Solo nomi per la stanza attiva ' + topics)
  console.log(allChats.nickname[1].avatar)
     console.log("message:" + JSON.stringify(allChats.chat));
  


//Local State by the hooks
  const [activeTopic, changeActiveTopic] = React.useState(topics[0])
  const [textValue, changeTextValue] = React.useState('')
  let chat = 'chat'
console.log('Active TOPIC ' + activeTopic);
  return (
    <div>
      <Paper className={classes.root} elevation={3}>
        <Typography variant="h5" component="h3">
          React App Chat
        </Typography>

        <Typography component="p">{activeTopic}</Typography>
        <div className={classes.flex}>
          <div className={classes.topicWindow}>
            <List>
              <Typography fontStyle="italic">
                Select a topic:
              </Typography>

              {topics.map(topic => (
                <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>

          <div className={classes.chatWindow}>
            {allChats.chat[activeTopic].map((chatEle, i) => (
              <div className={classes.flex} key={i}>
                <Chip className={classes.chip} color="primary" avatar={<Avatar src={chatEle.avatar} />} label={chatEle.from} />

                <Typography variant="body1" gutterBottom>
                  {chatEle.msg}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField label="Send a message" className={classes.chatBox} value={textValue} onChange={e => changeTextValue(e.target.value)} />

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sendChatAction({ chat: chat, from: allChats.nickname[1].from, msg: textValue, topic: activeTopic, avatar: allChats.nickname[1].avatar });
              changeTextValue("");
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
}
