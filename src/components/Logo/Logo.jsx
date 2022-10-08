import React, { Component } from "react";
import style from "./Logo.module.css";
import { Link } from "react-router-dom";

class Logo extends Component {
  state = {};
  render() {
    return (
      <div className={style.logoHolder}>
        <Link className={style.logo} to="/">
          <img
            src={window.location.origin + "/Images & Icons/Logo.png"}
            alt="Logo"
          />
        </Link>
      </div>
    );
  }
}

export default Logo;
