import React, { Component } from "react";
import Product from "../Product/Product";
import { getProductsData } from "../queries/queries";
import style from "./ProductsArea.module.css";
import { connect } from "react-redux";

class ProductsArea extends Component {
  state = {
    all: [],
  };

  getData = async () => {
    let temp = await getProductsData();
    this.setState({
      all: temp.products,
    });
  };

  componentDidMount() {
    this.getData();
  }

  setUI = (category) => {
    switch (category) {
      case "tech":
      case "Tech":
        return this.state.all.map((item) => {
          if (item.category === "tech") {
            return <Product key={item.id} data={item} />;
          }
          return "";
        });
      case "clothes":
      case "Clothes":
        return this.state.all.map((item) => {
          if (item.category === "clothes") {
            return <Product key={item.id} data={item} />;
          }
          return "";
        });
      default:
        return this.state.all.map((item) => (
          <Product key={item.id} data={item} />
        ));
    }
  };

  render() {
    return <div className={style.grid}>{this.setUI(this.props.category)}</div>;
  }
}

const mapStateToProps = (state) => {
  const data = {
    ...state.centralState,
  };

  const category = data.category;

  return { category };
};

export default connect(mapStateToProps)(ProductsArea);
