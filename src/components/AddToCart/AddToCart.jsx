import React, { Component } from "react";
import style from "./AddToCart.module.css";
import { setCartItem } from "../redux/actions/actions";
import { connect } from "react-redux";

class AddToCart extends Component {
  state = {};

  setCart = () => {
    let data = this.props.data;
    let product = {
      id: data.id,
      name: data.name,
      brand: data.brand,
      prices: data.prices,
      gallery: data.gallery,
      attributes: [],
      swatchAttributes: [],
    };

    this.props.addToCart(product);
  };

  disobeyLink = (e) => {
    e.preventDefault();
    this.setCart();
  };

  render() {
    if (this.props.attributeNum !== undefined) {
      return (
        <React.Fragment>
          {this.props.attributeNum > 0 ? (
            <div className={style.addToCart}>
              <img
                src={window.location.origin + "/Images & Icons/whiteCart.png"}
                alt="Add To Cart"
              />
            </div>
          ) : (
            <div className={style.addToCart} onClick={this.disobeyLink}>
              <img
                src={window.location.origin + "/Images & Icons/whiteCart.png"}
                alt="Add To Carts"
              />
            </div>
          )}
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapdispatchToProps = (dispatch) => {
  const addToCart = (product) => dispatch(setCartItem(product));

  return { addToCart };
};

export default connect(mapStateToProps, mapdispatchToProps)(AddToCart);
