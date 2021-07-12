import React from 'react'
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid } from "@material-ui/core";
import './Footer.css'

function Footer() {
    return (
      <>
        <Grid item xs={5} className="footer">
          <h4>Mockit</h4>
        </Grid>
        <Grid item xs={5} className="footer" justify="center" alignItems="center">
          <h4 style={{ display: "inline-block" }}>Developed with</h4>
          <FavoriteIcon style={{ fontSize: "10pt", margin: "0px 2px -2px" }} />
        </Grid>
      </>
    );
  }

export default Footer
