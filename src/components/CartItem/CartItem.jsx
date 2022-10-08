import React, { Component } from "react";
import style from "./CartItem.module.css";
import CartItemBreaker from "../CartItemBreaker/CartItemBreaker";
import { connect } from "react-redux";
import ChosenAttribute from "../ChosenAttribute/ChosenAttribute";
import { getAttributes } from "../queries/queries";
import ChosenSwatchAttribute from "../ChosenSwatchAttribute/ChosenSwatchAttribute";
import { setCartItem, removeCartItem } from "../redux/actions/actions";

class CartItem extends Component {
  state = {
    productData: {},
    currentImg: 1,
    index: 0,
    uniqueID: Math.random(),
    galleryLength: 0,
  };

  getData = async () => {
    let temp = await getAttributes(this.props.productID);
    this.setState({
      productData: temp,
    });
  };

  componentDidMount() {
    this.getData();
  }

  setCurrency = (currency) => {
    let chosenCurrency = "";
    switch (currency) {
      default:
        chosenCurrency = this.props.data.prices.filter(
          (item) => item.currency.label === this.props.currency
        );
        return `${this.props.currencySymbol}${chosenCurrency[0].amount}`;
    }
  };

  attributesSetup = (product, type) => {
    if (product !== undefined) {
      if (type === "Text") {
        return product.map((item) => (
          <ChosenAttribute
            key={Math.random()}
            data={this.state.productData}
            chosen={item}
            type={this.props.type}
          />
        ));
      } else if (type === "Swatch") {
        return product.map((item) => (
          <ChosenSwatchAttribute
            key={Math.random()}
            data={this.state.productData}
            chosen={item}
            type={this.props.type}
          />
        ));
      }
    }
  };

  moveImg = (direction) => {
    let max = this.props.data.gallery.length;
    let img = document.getElementById(`mainProductImg${this.state.uniqueID}`);
    if (direction === "right") {
      if (this.state.currentImg === max) {
        img.src = this.props.data.gallery[0];
        this.setState({
          index: 0,
          currentImg: 1,
        });
      } else {
        img.src = this.props.data.gallery[this.state.index + 1];
        this.setState({
          index: this.state.index + 1,
          currentImg: this.state.currentImg + 1,
        });
      }
    } else if (direction === "left") {
      if (this.state.currentImg === 1) {
        img.src = this.props.data.gallery[max - 1];
        this.setState({
          index: max - 1,
          currentImg: max,
        });
      } else {
        img.src = this.props.data.gallery[this.state.index - 1];
        this.setState({
          index: this.state.index - 1,
          currentImg: this.state.currentImg - 1,
        });
      }
    }
  };

  alterQuantity = (alteration) => {
    if (alteration === "add") {
      this.props.addToCart(this.props.data);
    } else if (alteration === "remove") {
      this.props.removeFromCart(this.props.data);
    }
  };

  render() {
    return (
      <React.Fragment>
        <CartItemBreaker />
        <div
          className={
            this.props.type !== "overlay"
              ? `${style.cartItem}`
              : `${style.cartItem} ${style.overlayed}`
          }
        >
          <div className={style.itemData}>
            <h3>{this.props.data.name}</h3>
            <h3 className={style.brand}>{this.props.data.brand}</h3>
            <h3>{this.setCurrency(this.props.currency)}</h3>
            {this.attributesSetup(this.props.data.attributes, "Text")}
            {this.attributesSetup(this.props.data.swatchAttributes, "Swatch")}
          </div>
          <div className={style.itemEdit}>
            <div className={style.quantity}>
              <div
                className={
                  this.props.type !== "overlay"
                    ? `${style.icon}`
                    : `${style.icon} ${style.overlayedIcon}`
                }
                onClick={(e) => this.alterQuantity(e, "add")}
              >
                <img
                  src={window.location.origin + "/Images & Icons/plus.png"}
                  alt="Increase Quantity"
                />
              </div>
              <h3>{this.props.quantity}</h3>
              <div
                className={
                  this.props.type !== "overlay"
                    ? `${style.icon}`
                    : `${style.icon} ${style.overlayedIcon}`
                }
                onClick={(e) => this.alterQuantity(e, "remove")}
              >
                <img
                  src={window.location.origin + "/Images & Icons/minus.png"}
                  alt="Decrease Quantity"
                />
              </div>
            </div>
            <div className={style.gallery}>
              <div
                className={
                  this.props.type !== "overlay"
                    ? `${style.mainImgHolder}`
                    : `${style.mainImgHolder} ${style.overlayedImg}`
                }
              >
                <img
                  id={`mainProductImg${this.state.uniqueID}`}
                  className={style.mainImg}
                  src={this.props.data.gallery[0]}
                  alt="Product"
                />
                {this.props.data.gallery.length > 1 &&
                this.props.type !== "overlay" ? (
                  <div className={style.galleryNav}>
                    <div
                      className={style.left}
                      onClick={() => this.moveImg("left")}
                    >
                      <img
                        src={
                          window.location.origin +
                          "/Images & Icons/leftcaret.png"
                        }
                        alt="Navigate Left"
                      />
                    </div>
                    <div
                      className={style.right}
                      onClick={() => this.moveImg("right")}
                    >
                      <img
                        src={
                          window.location.origin +
                          "/Images & Icons/rightcaret.png"
                        }
                        alt="Navigate Right"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const data = {
    ...state.centralState,
  };

  const currencySymbol = data.currencySymbol;
  const currency = data.currencyLabel;

  return { currency, currencySymbol };
};

const mapDispacthToProps = (dispatch) => {
  const addToCart = (product) => dispatch(setCartItem(product));
  const removeFromCart = (product) => dispatch(removeCartItem(product));

  return { addToCart, removeFromCart };
};

export default connect(mapStateToProps, mapDispacthToProps)(CartItem);
