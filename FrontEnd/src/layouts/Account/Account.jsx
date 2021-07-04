import React from "react";
import AppBar from "../../Components/App Bar/AppBar";
import { Container, Grid, Avatar, CssBaseline } from "@material-ui/core";
import { CurveShape, CurveInverted } from "../../assets/svg/svg.jsx";
import ahmedImg from "../../assets/img/Formal_Image-removebg-preview.png";
import coverImg from "../../assets/img/trial2.jpg"
import "./Account.css";
import { width } from "@material-ui/system";

let img;
function Account() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="false" disableGutters style={{backgroundColor:"#FFFFFF"}}>
          <Grid  style={{height:"100vh"}}>

        <Grid item direction="column" sm={12}  style={{height:"100%"}}>
          <Grid item xs={12}>
            <AppBar />
          </Grid>

          <Grid
            item
            direction="column"
            xs={12}
            style={{ overflow: "hidden", height:"100%"}}
            justify="space-evenly"
            >
            {/* <CurveShape /> */}
            <h2 className="svg__Header">Account</h2>
            <Grid
              container
              item
              xs={12}
              className="accountMainBody"
              >
              <CurveInverted />
              <Grid item sm={0} md={3} alignItems="flex-end">
                  <div className="align__Div">

                {(img && <Avatar></Avatar>) || (
                    <img src={ahmedImg} alt="ahmed" className="image__Section" />
                    )}
                    </div>
              </Grid>
              <Grid xs={12} md={9} className="border"></Grid>
            </Grid>
          </Grid>
        </Grid>
                    </Grid>
      </Container>
    </>
  );
}

export default Account;
