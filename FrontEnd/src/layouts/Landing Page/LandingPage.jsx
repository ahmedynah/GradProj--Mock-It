import { Grid } from "@material-ui/core";
import React from "react";
import ahmed from "../../assets/img/Formal_Image-removebg-preview.png";
import khawaga from "../../assets/img/Khawaga-removebg-preview.png";
import zeyad from "../../assets/img/Zeyad_n-removebg-preview.png";
import omar from "../../assets/img/me-removebg-preview.png";
import logo from "../../assets/img/mock-it-logo.png";
import AppBar from "../../Components/App Bar/AppBar";
import RightImg from "../../assets/img/london-news-presenter-ctv-news.png";
import SecondWoman from '../../assets/img/PngItem_2085056.png'
import Footer from "../../Components/Footer/Footer";
import { TiltShape, Arrow } from "../../assets/svg/svg";
import "./LandingPage.css";

function Card() {
  return (
    <>
      <div className="cardContainer">
        <div class="a-box">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img className="imgsOfDevelopers" src={ahmed} />
              </div>
            </div>
          </div>
        </div>
        <div class="text-container">
          <h3>Ahmed Hany</h3>
          
        </div>
      </div>
      <div className="cardContainer">
        <div class="a-box">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img className="imgsOfDevelopers" src={khawaga} />
              </div>
            </div>
          </div>
        </div>
        <div class="text-container">
          <h3>Mohamed Khawaga</h3>
          
        </div>
      </div>
      <div className="cardContainer">
        <div class="a-box">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img className="imgsOfDevelopers" id="omarimg" src={omar} />
              </div>
            </div>
          </div>
        </div>
        <div class="text-container">
          <h3>Omar Harb</h3>
          
        </div>
      </div>
      <div className="cardContainer">
        <div class="a-box">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img className="imgsOfDevelopers" id="zeyadimg" src={zeyad} />
              </div>
            </div>
          </div>
        </div>
        <div class="text-container">
          <h3>Zeyad Alaa</h3>
          
        </div>
      </div>
    </>
  );
}

function LandingPage() {
  return (
    <Grid container justify="center" className="landingPageContainer">
      <Grid item container xs={12} className="heroSection">
        <TiltShape />
        <AppBar />
        <Grid
          item
          xs={12}
          md={9}
          direction="column"
          justify="center"
          style={{position:"relative"}}
        >
          <div className=""></div>
          <div className="heroText">
            <p id="slogan1">Mock-it is where you discover</p>
            <span id="bigText">the presenter</span>
            <p id="slogan2">within you</p>
          </div>
          <div className="descriptionTextContainer">
            <p id="descriptionText">
              Mock-it is an online web application which supports all needs for
              self presentation skills training by analyzing more than one
              aspect through highly trained Multi-Model AI which feeds on
              presentation videos and many well structured presentation slides
              and provides the user with a presentation skill score based on six
              different criteria.
            </p>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          className="hero__rightImg--Section"
          style={{ overflowX: "hidden" }}
        >
          <img src={RightImg} alt="" className="rightImg" />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={0} md={4}>
            <img src={SecondWoman} className="secondWomanImg" alt=""/>
        </Grid>
      <Grid item xs={0} md={2}>

      </Grid>
      <Grid item xs={12} md={4}>
          <div className="middleSection">
            <p>
              Mock-it relays on AI Our project offers for students, presenters and companies,
               a web platform you can use the platform
               to train yourself or interview your candidates then we give you the result
            </p>
          </div>
      </Grid>
      </Grid>
      <Grid container item xs={10} justify="center" alignContent="center">
        <Grid container item xs={5} alignItems="center">
          <div className="separatorDiv"></div>
        </Grid>
        <Grid item xs={2}>
          <div className="separatorText">
            <span className="separatorText">Developers</span>
          </div>
        </Grid>
        <Grid container item xs={5} alignItems="center">
          <div className="separatorDiv"></div>
        </Grid>
      </Grid>
      <Grid
        item
        container
        justify="space-evenly"
        alignItems="center"
        xs={12}
        style={{ overflowX: "hidden", position:"relative" }}
      >
        {/* <Arrow/> */}
        <Card />
      </Grid>
      <Grid
        item
        container
        justify="space-evenly"
        xs={12}
        className="footerSection"
        style={{ overflowX: "hidden" }}
      >
        <Footer />
      </Grid>
    </Grid>
  );
}

export default LandingPage;
