import React, { Component } from "react";
import MainStore from "../components/MainStore/MainStore";
import Navbar from "../components/Nav/Navbar";

class StoreFront extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <MainStore />
      </React.Fragment>
    );
  }
}

export default StoreFront;
