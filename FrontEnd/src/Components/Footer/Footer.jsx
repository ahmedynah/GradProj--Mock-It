import React from 'react'
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid } from "@material-ui/core";
import './Footer.css'

function Footer() {
    return (
      <>
        <Grid item xs={5}>
          
        </Grid>
        <Grid item xs={5}  justify="center" alignItems="center">
          <h4 className="footerText">Developed with</h4>
          <FavoriteIcon style={{ fontSize: "10pt", margin: "0px 2px -2px" }} />
          <h4  className="footerText"> by Mock-it</h4>
        </Grid>
      </>
    );
  }

export default Footer
