import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./MainStore.module.css";
import ProductsArea from "../ProductsArea/ProductsArea";

class MainStore extends Component {
  state = {};

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <div className={style.mainStore}>
        <h1 className={style.categoryName}>
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        <ProductsArea />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const data = {
    ...state.centralState,
  };

  const category = data.category;

  return { category };
};

export default connect(mapStateToProps)(MainStore);
