import React, { Component } from "react";
import Cart from "../Cart/Cart";

class OverlayCart extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="overlayItem">
          <Cart type="overlay" />
        </div>
      </React.Fragment>
    );
  }
}

export default OverlayCart;
