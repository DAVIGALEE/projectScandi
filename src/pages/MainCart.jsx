import React, { Component } from "react";
import Cart from "../components/Cart/Cart";
import Navbar from "../components/Nav/Navbar";

class MainCart extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar filterStatus="deny" />
        <Cart />
      </React.Fragment>
    );
  }
}

export default MainCart;
