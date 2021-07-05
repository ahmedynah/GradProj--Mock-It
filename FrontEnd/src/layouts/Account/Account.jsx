import React, { useState, useEffect } from "react";
import AppBar from "../../Components/App Bar/AppBar";
import {
  Container,
  Grid,
  Avatar,
  CssBaseline,
  Button,
} from "@material-ui/core";
import { CurveShape, CurveInverted } from "../../assets/svg/svg.jsx";
import ahmedImg from "../../assets/img/Formal_Image-removebg-preview.png";
import coverImg from "../../assets/img/trial2.jpg";
import "./Account.css";
import { width } from "@material-ui/system";

let img;
/**
 * 
 * @returns Account Component
 */
function Account() {

    /**
     * 
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} emailName
     * @param {string} gender
     * @param {Date}   dob
     * @param {string} job
     * @param {string} overallScore
     * @returns UserData Component
     */
  function UserData({
    firstName,
    lastName,
    email,
    gender,
    dob,
    job,
    overallScore,
  }) {
      /**
       * States for userData Component
       */
    const [FirstName, setFirstName] = useState(firstName);
    const [LastName, setLastName] = useState(lastName);
    const [Email, setEmail] = useState(email);
    const [Gender, setGender] = useState(gender);
    const [Dob, setDOB] = useState(dob);
    const [Job, setJob] = useState(job);
    const [OverallScore, setOverallScore] = useState(overallScore);

    function handleEditClicked(e) {
      if (e.target.name === "firstName") setFirstName(e.target.value);
      else if (e.target.name === "lastName") setLastName(e.target.value);
      else if (e.target.name === "email") setEmail(e.target.value);
      else if (e.target.name === "gender") setGender(e.target.value);
      else if (e.target.name === "dob") setDOB(e.target.value);
      else if (e.target.name === "job") setJob(e.target.value);
    }

    useEffect(() => {
      console.log("in Effect");
      Array.from(document.querySelector("#gender").options).forEach(function (
        option_element
      ) {
        let option_text = option_element.text;
        let option_value = option_element.value;
        let is_option_selected = option_element.selected;

        if (is_option_selected) setGender(option_value);
        console.log(Gender);
        // console.log('Option Text : ' + option_text);
        // console.log('Option Value : ' + option_value);
        // console.log('Option Selected : ' + (is_option_selected === true ? 'Yes' : 'No'));

        console.log("\n\r");
      });
    }, [Gender]);

    return (
      <div className="content">
        <h1 className="userName">
          {FirstName}
          {"\u00A0"}
          {LastName}
        </h1>
        <div className="mainData">
          <form className="formDiv">
            <div className="horizontalDiv">
              <div className="singleDataDiv">
                <h2 className="dataFieldName">First Name:</h2>
                <input
                  type="text"
                  value={FirstName}
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleEditClicked}
                  className="dataInput"
                ></input>
              </div>
              <div className="singleDataDiv">
                <h2 className="dataFieldName">Last Name:</h2>
                <input
                  type="text"
                  value={LastName}
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleEditClicked}
                  className="dataInput"
                ></input>
              </div>
            </div>

            <div className="horizontalDiv">
              <div className="gender">
                <select
                  className="dataInput"
                  name="gender"
                  id="gender"
                  onChange={handleEditClicked}
                >
                  <option value="Gender">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  {/* <input type="text" value={firstName} placeholder="First Name" onChange={handleEditClicked} className="firstName"></input> */}
                </select>
              </div>
              <div className="singleDataDiv">
                <h2 className="dataFieldName">Date of Birth:</h2>
                <input
                  type="date"
                  value={Dob}
                  name="dob"
                  placeholder="Date of Birth:"
                  onChange={handleEditClicked}
                  className="dataInput"
                ></input>
              </div>
            </div>
            <div className="horizontalDiv">
              <div className="singleDataDiv">
                <h2 className="dataFieldName">Email:</h2>
                <input
                  type="email"
                  value={Email}
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={handleEditClicked}
                  className="dataInput"
                ></input>
              </div>
              <div className="singleDataDiv">
                <h2 className="dataFieldName">Job:</h2>
                <input
                  type="text"
                  value={Job}
                  name="job"
                  placeholder="eg. Engineer"
                  onChange={handleEditClicked}
                  className="dataInput"
                ></input>
              </div>
            </div>
            <Button type="submit" className="submitBtn">
              Save
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="false"
        disableGutters
        style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}
      >
        <Grid style={{ height: "100vh" }}>
          <Grid item direction="column" sm={12} style={{ height: "100%" }}>
            <Grid item xs={12}>
              <AppBar />
            </Grid>

            <Grid
              item
              direction="column"
              xs={12}
              style={{ overflow: "hidden", height: "100%" }}
              justify="space-evenly"
              alignItems="center"
            >
              {/* <CurveShape /> */}
              <h2 className="svg__Header">Account</h2>
              <Grid
                container
                item
                xs={8}
                md={7}
                className="accountMainBody roundedBorders"
                style={{
                  display: "flex",
                  justifyItems: "center",
                  margin: "0px auto",
                  overflowY: "hidden",
                }}
              >
                {/* <div className="blur"></div> */}
                <CurveInverted />
                <Grid
                  item
                  xs={12}
                  lg={3}
                  alignItems="flex-end"
                  className="basicInfo__LeftSection"
                >
                  <div className="align__Div">
                    {(img && (
                      <Avatar src={ahmedImg} id="avatar__Section"></Avatar>
                    )) || (
                      <img
                        src={ahmedImg}
                        alt="ahmed"
                        className="image__Section"
                      />
                    )}
                  </div>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  lg={9}
                  justify="center"
                  alignItems="center"
                  className="basicInfo__RightSection"
                >
                  
                    <UserData
                      firstName="Ahmed"
                      lastName="Abouelnasr"
                      email="ahmedhanyhasn@gmail.com"
                      gender="Male"
                      DOB="25-10-2016"
                    />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Account;