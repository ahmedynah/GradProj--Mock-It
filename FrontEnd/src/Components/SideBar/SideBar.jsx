import React from 'react'
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import './SideBar.css'

function SideBar() {
    return (
      <Grid
        direction="column"
        justify="center"
        container
        item
        xs={0}
        md={2}
        id="forelshabab"
      >
        {/* <Grid item xs="1"></Grid> */}
        <div id="semiCircle"></div>
        <ul className="sideBarMenu">
          <li className="sideBarMenu__item">
            {" "}
            <span className="menuItem__text">
              <Link className="homeLink" to="/">
                Home
              </Link>
            </span>
          </li>
          <li className="sideBarMenu__item">
            {" "}
            <span className="menuItem__text">Connections</span>
          </li>
          <li className="sideBarMenu__item">
            {" "}
            <span className="menuItem__text">Dashboard</span>
          </li>
        </ul>
      </Grid>
    );
  }

export default SideBar
