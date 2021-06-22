import React , {useState} from "react";
import SignIn from "../../Components/Sign In/SignIn";
import {Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import gif from "../../images/ClipartKey_1660502.png";

import "./SignInSignUpPage.css";
import { minWidth } from "@material-ui/system";

const useStyles = makeStyles((theme)=>({
  outerContainer:{
    minWidth:"200px",
    maxHeight:"100vh",    
  },
  image:{
    minWidth:"200px"
  }
}))

function SignInSignUpPage() {
const classes = useStyles();

return (
  <Grid container justify="center" alignItems="center" className="signInSignUpPage">
    <Grid item container className="outerDiv" direction="row" justify="center" alignItems="center" xs="10" sm="8">
      
      <Grid item xs="7" className={classes.outerContainer}>

        <SignIn className="signInSignUpPage__form" />
      </Grid>
        
        <Grid  item xs="0" md="5">

        <img src={gif} alt="git" className="signInSignUpPage__img" />
        </Grid>
    </Grid>
  </Grid>
  );
}

export default SignInSignUpPage;
