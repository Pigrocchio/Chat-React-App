import React from "react";
import Button from "@material-ui/core/Button";
import { CTX } from "./Store";
import TextField from "@material-ui/core/TextField";


export default function Login () {


  const { allChats, sendNameAction } = React.useContext(CTX);
  console.log("Login" + JSON.stringify(allChats.user));


//Local State by the hooks
    const [textValue, changeTextValue] = React.useState('')


  return (
           <div className="login">
        <form className="login-form">
          <label htmlFor="nickname">
            <h3>Whic nickname want to use ?</h3>
          </label>
          <TextField label="Send a message" value={textValue} onChange={e => {
            changeTextValue(e.target.value)
            console.log(textValue);
          }} />
          
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sendNameAction(textValue);
              
            }}
          >
            It's ok
          </Button>
        </form>
      </div>
    );
  }



