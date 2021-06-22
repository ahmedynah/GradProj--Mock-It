import React, { useState } from "react";
import "./SignIn.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import google from "../../images/google logo.png";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";
import Dialog from "../Sign Up/SignUp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "50px",
    width: "100%",
    height:"100%",
  },
  signInHeaderBlock: {
    alignSelf: "flex-start",
    flex: 0.1,
  },
}));

function SignIn() {
  const handleCallBack = (open) => {
    setOpenDialog(open);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        xs="12"
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
          xs="12"
          container
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs="12" md="6">
            <button className="signIn--btn">
              <FacebookIcon id="facebookImage" />
              <span className="signInWith__Text">SIGN IN WITH FACEBOOK</span>
            </button>
          </Grid>
          <Grid item xs="12" md="6">
            <button className="signIn--btn">
              <img id="googleImage" src={google} alt="" />
              <span className="signInWith__Text">SIGN IN WITH GOOGLE</span>
            </button>
          </Grid>
        </Grid>
        <Grid item>

        <form action="post" className="signIn__form">
          <div className="form__Input">
            <label className="signIn__InputLabel">Email</label>
            <input className="signIn__Input" type="email" />
          </div>
          <div className="form__Input">
            <label className="signIn__InputLabel">Password</label>
            <input className="signIn__Input" type="password" />
          </div>
          <button className="form__submit" type="submit">
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
          <span className="form__forgotPassword"> Forgot your Password?</span>
        </form>
            </Grid>
      </Grid>
    </Grid>
  );
}

export default SignIn;
