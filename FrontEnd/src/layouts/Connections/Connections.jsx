import React from "react";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import AppBar from "../../Components/App Bar/AppBar";
import { WavesOpacity } from "../../assets/svg/svg";
import SideBar from "../../Components/SideBar/SideBar";
import personalImg from "../../assets/img/test.png";
import MockIT from "../../assets/img/mock-it-logo.png";
import "./Connections.css";

function Person({ imgUrl, firstName, lastName, lastOnline, about }) {
  return (
    <>
      {/* <!-- flip-card-container --> */}
      <li>
        <a href="" class="card">
          <div class="card__image"></div>
          <div class="card__overlay">
            <div class="card__header">
              <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                <path />
              </svg>
              <img class="card__thumb" src={imgUrl} alt="" />
              <div class="card__header-text">
                <h3 class="card__title">
                  {(firstName && lastName) || "Default User"}
                </h3>
                <span class="card__status">
                  {"last online " + (lastOnline || "1 hour") + " ago"}
                </span>
              </div>
            </div>

            <p class="card__description">{about || "no bio"}</p>
            <div className="buttonsContainer">
              <span className="viewUser">View</span>
              <Button id="addBtn">Add</Button>
            </div>
          </div>
        </a>
      </li>
    </>
  );
}

function Connections() {
  const users = [
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
    {
      imgURl: personalImg,
      FN: "User",
      LN: "User",
      about: "status",
      lastOnline: "3 days",
    },
  ];
  return (
    <>
      {/* <CssBaseline/> */}
      <Grid container direction="column" style={{ height: "100%" }}>
        <WavesOpacity />
        <Grid item xs={12} style={{ flex: "0.01" }}>
          <AppBar />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="space-around"
          style={{
            maxHeight: "100%",
            flex: "1",
            boxSizing: "border-box",
            padding: "10px",
            margin: "0px",
            overflowY: "auto",
          }}
          spacing={0}
        >
          <SideBar />
          <Grid
            container
            spacing={4}
            xs={12}
            md={10}
            className="mainConnection"
            style={{ overflowY: "auto" }}
          >
            <Grid item xs={12} justify="center">
              <ul class="cards">
                {users.map((person) => {
                  return (
                    <Person
                      imgUrl={personalImg}
                      firstName={person.FN}
                      lastName={person.LN}
                      lastOnline={person.lastOnline}
                      about={person.about}
                    />
                  );
                })}
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Connections;
