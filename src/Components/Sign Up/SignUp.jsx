import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FacebookIcon from "@material-ui/icons/Facebook";
import google from "../../assets/img/google logo.png";
import MockItLogo from "../../assets/img/mock-it-logo.png";
import Rocket from "../../assets/img/371909290_ROCKET_400px.gif";
import "./SignUp.css";
import firebase from "../../config/Firebase";
const firestore = firebase.firestore();

export default function MaxWidthDialog({ openDialog, parentCallback }) {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [firebaseErr, setFirebaseErr] = useState(false);
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");

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

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  const handleClose = () => {
    setOpen(false);
    parentCallback(false);
  };


   const handleTextChange = (e) => {
    if(e.target.id === "fn")
      setFn(e.target.value);
    else if(e.target.id === "ln")    
      setLn(e.target.value);
    else if(e.target.id === "date")    
      setDate(e.target.value)
    else if(e.target.id === "gender")    
      setGender(e.target.options[e.target.options.selectedIndex].innerHTML);
    else if(e.target.id === "email")    
      setEmail(e.target.value);
    else if(e.target.id === "pass")    
      setPass(e.target.value); 
    else if(e.target.id === "repass")    
      setRePass(e.target.value); 
  };
  
  const validateUser = async (e) => {
    e.preventDefault();
    const passptrn = /[a-zA-Z0-9]{8,}/;
    if(fn === "")
    {
      console.log("Enter your first name...");
      return;
    }
    else if(ln === "")
    {
      console.log("Enter your last name...");
      return;
    }
    else if(gender === "Gender")
    {
      console.log("Choose your gender...");
      return;
    } 
    else if(date === "")
    {
      console.log("Choose your birth date...");
      return;
    }
     if(pass === rePass)
    { console.log("same pass");
      if(passptrn.test(pass))
      {
         console.log("correct pass");
        let verfied = true;
        console.log(email.toLocaleLowerCase());
        await firebase.auth().createUserWithEmailAndPassword(email.toLocaleLowerCase(), pass)
         .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        if( errorCode === "auth/email-already-in-use" )
        {
            verfied = false;
            firebaseErr = true;
            console.log(errorCode);
        }else
         console.log(errorCode);
        });

        if(verfied)
        {
           var pushData = await firestore.collection('users').doc(firebase.auth().currentUser.uid);
           pushData.set({
             firstname: fn,
             lastname: ln,
             email: email,
             dob: date,
             gender: gender
           });
        }

      }else
      {
        console.log("Password must be at least 8 characters...");
        return;
      }
    }else
    {

    }
  };

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <div className="custom-shape-divider-top-1624301897">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
          <div className="dialogTitle">
            <img src={MockItLogo} alt="f" className="dialogTitle__logo" />
            <span className="dialogTitle__header">Sign Up</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className="contentText">
              Get one step closer to a perfect presentation!
            </span>
          </DialogContentText>

          <Grid container className="content"justify="space-between" alignItems="center">
              <div className="content--info">
                <h2 id="flyingTextTop">Are you ready to</h2>
                <h2 id="flyingTextCenter">LAUNCH </h2>
                <h2 id="flyingTextBottom">your future?</h2>
                <div className="upDownMovement">
                  <img src={Rocket} alt="" id="content--info__img" />
                </div>
              </div>
              <div className="content--form">
                <div>
                  <input
                    className="content--form__input name--FN"
                    type="text"
                    placeholder="First Name"
                    maxLength="32"
                    pattern="[A-Za-z]+"
                    id="fn"
                    onChange={handleTextChange}
                  />
                </div>

                <input
                  className="content--form__input name--LN"
                  type="text"
                  placeholder="Last Name"
                  maxLength="32"
                  pattern="[A-Za-z]+"
                  id="ln"
                  onChange={handleTextChange}
                />
                <div className="DateAndGender">
                  <input  id="date" onChange={handleTextChange} className="content--form__input date" type="date" />

                  <select
                    name="gender"
                    id="gender"
                    className="content--form__input gender"
                    onChange={handleTextChange}
                  >
                    <option value="Gender" defaultValue>
                      Gender
                    </option>
                    <option value="Gender" defaultValue>
                      Male
                    </option>
                    <option value="Gender" defaultValue>
                      Female
                    </option>
                  </select>
                </div>

                <input
                  className="content--form__input"
                  placeholder="Email"
                  type="email"
                  id="email"
                  onChange={handleTextChange}
                />

                <input
                  className="content--form__input"
                  type="password"
                  minLength="8"
                  autoComplete="new-password"
                  placeholder="Password"
                  id="pass"
                  onChange={handleTextChange}
                />

                <input
                  className="content--form__input"
                  placeholder="Repeat Password"
                  type="password"
                  id="repass"
                  onChange={handleTextChange}
                />
                <span id="termsOfUse">
                  By clicking Sign Up, you agree to our{" "}
                  <a href="">Terms, Data Policy</a>
                  {"\u00A0"}and <a href=""> Cookies Policy</a>.
                </span>

                <button onClick={validateUser} className="form__submitBtn">
                  {" "}
                  Sign Up
                </button>
              </div>
              <div className="barrier">
                <div className="verticalLine"></div>
                <span className="barrier__word">OR</span>
                <div className="verticalLine"></div>
              </div>
              <div className="content--signUpWith">
                {/* <span className="content--signUpWith__header"> Sign Up with</span> */}

                <div className="content--signUpWith__buttons">
                  <button className="btn">
                    <FacebookIcon id="facebookImage" />
                    <span className="btn__text">SIGN UP WITH FACEBOOK</span>
                  </button>
                  <button className="btn">
                    <img src={google} alt="" id="googleImage" />
                    <span className="btn__text">SIGN UP WITH GOOGLE</span>
                  </button>
                </div>
              </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
