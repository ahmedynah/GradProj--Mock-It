import React from "react";
import "./svg.css";

export const CurveShape = () => {
  return (
    <div class="custom-shape-divider-top-1625399979">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  );
};

export const CurveInverted = () => {
  return (
    <div class="custom-shape-divider-top-1625405656">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  );
};
