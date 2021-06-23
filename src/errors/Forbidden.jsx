import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

import firebase from "../config/Firebase";

class Forbidden extends React.Component {
  render() {
    return (
      <Fragment>
        <div
          className="bg-dark text-white py-5"
          style={{
            width: " 100vw",
            height: "100vh"
          }}
        >
          <div
            className="container py-5"
            style={{
              marginTop: "230px"
            }}
          >
            <div className="row">
              <div className="col-md-2 text-center">
                <p style={{ fontSize: 20 }}>
                  <i
                    className="fa fa-exclamation-triangle fa-5x"
                    style={{ fontSize: 80 }}
                  ></i>
                  <br /> <br />
                  Status Code: 403
                </p>
              </div>
              <div className="col-md-10">
                <h1>OPPSSS!!!&nbsp;&nbsp;Sorry...</h1>
                <p style={{ fontSize: 20 }}>
                  Sorry, your access is refused due to security reasons.
                  <br />
                  Please go back to the previous page.
                </p>
                <Button
                  variant="btn-danger"
                  size="xs"
                  className="btn-danger"
                  style={{ fontSize: 17 }}
                  onClick={() => {
                    firebase
                      .auth()
                      .signOut()
                      .then(function() {
                        window.location.href = "/login";
                      })
                      .catch(function(err) {
                        console.log(err);
                      });
                  }}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Forbidden;
