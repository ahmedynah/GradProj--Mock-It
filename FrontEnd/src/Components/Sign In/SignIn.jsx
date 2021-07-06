import React, { useState } from "react";
import "./SignIn.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import google from "../../assets/img/google logo.png";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";
import Dialog from "../Sign Up/SignUp";
import firebase from "../../config/Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const useStyles = makeStyles((theme) => ({
 
  signInHeaderBlock: {
    alignSelf: "flex-start",
    flex: 0.1,
  },
  border:{
    border:"1px solid black",
    height:"100%",
  }
}));

function SignIn() {
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const classes = useStyles();
  const checkDisplayName = (name) => {
    let splitNames = name.split();
    console.log(splitNames);
  };
  const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/profile',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => {
      console.log(firebase.auth().currentUser.providerData[0].providerId);
    }
  }
};

  const handleCallBack = (open) => {
    setOpenDialog(open);
  };
 
  const handleTextChange = (e) => {
    if(e.target.id === "email")    
      setEmail(e.target.value);
    else if(e.target.id === "pass")    
      setPass(e.target.value); 
  };

  const handleResetPass = () => {
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
       alert("Succesfully sent a reset email..");
    }).catch((err) => {
      alert("Make sure you entered a correct email");
    });
  };

  const handleSignIn = async (e) => {
    console.log(email.toLocaleLowerCase());
    e.preventDefault();
     try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.toLocaleLowerCase(), pass).then((user) => {
          console.log(user);
        });
    } catch (err) {
      console.log(err.code);
    }  
  };
const handleReset = async (e) => {
    e.preventDefault();
  
    try {
      await firebase
        .auth()
        .sendPasswordResetEmail(email.value)
        .then(function () {
          window.alert(
            "Email has been sent to you , please check your email and verify"
          );
        });
    } catch (err) {
      console.log(err.code);
    }
  };

  return (
    <Grid container className="root">
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        xs="12"
        className="test"
      >
        <Grid
          item
          xs="12"
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <h1>Sign In</h1>
          <div className="signInWith__Header">
            <hr />
            <h5> Sign in with</h5>
          </div>
        </Grid>
        <Grid
          item
          xm="12"md="10"
          container
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid xs="0" md="1"/>
          <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
          />
          <Grid xs="0" md="1"/>
        </Grid>
        <Grid item className="form--Container">

        <div className="signIn__form">
          <div className="form__Input">
            <label className="signIn__InputLabel">Email</label>
            <input id="email" onChange={handleTextChange} className="signIn__Input" type="email" />
          </div>
          <div className="form__Input">
            <label className="signIn__InputLabel">Password</label>
            <input id="pass" onChange={handleTextChange} className="signIn__Input" type="password" />
          </div>
          <button className="form__submit" onClick={handleSignIn}>
            {" "}
            Log in {"\u00A0"}
            <ArrowForwardIcon />
          </button>
          <Button
            variant="text"
            color="primary"          
            onClick={() => setOpenDialog(true)}
            > Sign Up</Button>
          {console.log(openDialog)}
          <Dialog openDialog={openDialog} parentCallback={handleCallBack} />
          <span onClick={handleResetPass} className="form__forgotPassword"> Forgot your Password?</span>
        </div>
            </Grid>
      </Grid>
    </Grid>
  );
}

export default SignIn;
