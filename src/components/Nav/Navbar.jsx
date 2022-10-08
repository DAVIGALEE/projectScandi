import React, { Component } from "react";
import Logo from "../Logo/Logo";
import NavActions from "../NavActions/NavActions";
import NavFilters from "../NavFilters/NavFilters";
import style from "./Navbar.module.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className={style.navHolder}>
        <nav className={style.nav}>
          <NavFilters status={this.props.filterStatus} />
          <Logo />
          <NavActions />
        </nav>
      </div>
    );
  }
}

export default Navbar;
