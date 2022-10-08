import React, { Component } from "react";
import Navbar from "../components/Nav/Navbar";
import ProductData from "../components/ProductData/ProductData";

class ProductView extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar filterStatus="deny" />
        <ProductData />
      </React.Fragment>
    );
  }
}

export default ProductView;
