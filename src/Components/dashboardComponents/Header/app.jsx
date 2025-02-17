import React from "react";
import Logo from "../../../assets/Coca-Cola_logo.svg.png";
import Chip from "@mui/material/Chip";
import "./app.scss";

function app(props) {
  return (
    <>
      <header>
        <div className="headerWrapper">
          <div className="logoCon">
            <img src={Logo} alt="logo" />
          </div>

          <div className="userDetails">
            <Chip label={props.plan} variant="outlined" className="nameDes" />
          </div>
        </div>
      </header>
    </>
  );
}

export default app;
