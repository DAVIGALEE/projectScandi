import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";
import CartItemBreaker from "../CartItemBreaker/CartItemBreaker";
import {
  setArrangedCart,
  setCartItem,
  removeCartItem,
  clearCart,
} from "../redux/actions/actions";
import { Link } from "react-router-dom";
class Cart extends Component {
  state = {
    cartArrangedData: [],
  };

  setupCartItems = () => {
    let filteredData = [];
    let data = this.props.cartData;
    let added = false;
    if (data.length === 0) {
      this.setState({
        cartArrangedData: filteredData,
      });
      this.props.arrangeCart(filteredData);
      return;
    }
    data.forEach((item) => {
      added = false;
      if (filteredData.length === 0) {
        filteredData.push({
          quantity: 1,
          data: item,
        });
        added = true;
      } else {
        filteredData.forEach((mainItem) => {
          if (item.name === mainItem.data.name) {
            if (
              JSON.stringify(item.attributes) ===
              JSON.stringify(mainItem.data.attributes)
            ) {
              if (
                JSON.stringify(item.swatchAttributes) ===
                JSON.stringify(mainItem.data.swatchAttributes)
              ) {
                let mainItemIndex = filteredData.indexOf(mainItem);
                filteredData[mainItemIndex].quantity += 1;
                added = true;
                return;
              }
            }
          }
        });
        if (added === false) {
          filteredData.push({
            quantity: 1,
            data: item,
          });
          return;
        }
      }
    });
    this.setState({
      cartArrangedData: filteredData,
    });
    this.props.arrangeCart(filteredData);
  };

  getTotal = () => {
    let total = 0;
    let pricesArray = [];
    this.state.cartArrangedData.forEach((item) => {
      item.data.prices.forEach((price) => {
        if (price.currency.label === this.props.currency) {
          pricesArray.push(price.amount * item.quantity);
        }
      });
    });
    pricesArray.forEach((item) => {
      total += item;
    });
    return `${this.props.currencySymbol}${total.toFixed(2)}`;
  };

  componentDidMount() {
    this.setupCartItems(this.props.cartData);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartData !== this.props.cartData) {
      this.setupCartItems(this.props.cartData);
    }
  }

  render() {
    return (
      <div className={style.cartHolder}>
        {this.props.type === "overlay" ? (
          <h3>My Bag, {this.props.quantity} items</h3>
        ) : (
          <h1>Cart</h1>
        )}
        {this.state.cartArrangedData.map((item) => (
          <CartItem
            key={Math.random()}
            type={this.props.type}
            quantity={item.quantity}
            productID={item.data.id}
            data={item.data}
          />
        ))}
        <div className={style.Checkout}>
          <CartItemBreaker />
          {this.props.type !== "overlay" ? (
            <h3>Quantity: {this.props.quantity}</h3>
          ) : (
            ""
          )}
          {this.props.type !== "overlay" ? (
            <h3>Total: {this.getTotal()}</h3>
          ) : (
            <div className={style.overlayTotal}>
              <h3>Total: </h3>
              <h3>{this.getTotal()}</h3>
            </div>
          )}
          {this.props.type !== "overlay" ? (
            <button className={style.order} onClick={() => this.props.clear()}>
              Order
            </button>
          ) : (
            <div className={style.cartActions}>
              <Link to="/cart">
                <button className={style.viewBag}>View Bag</button>
              </Link>
              <button
                className={style.order1}
                onClick={() => this.props.clear()}
              >
                Check out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const data = {
    ...state.centralState,
  };

  const cartData = data.cart;
  const quantity = data.quantity;
  const currency = data.currencyLabel;
  const currencySymbol = data.currencySymbol;
  return { cartData, quantity, currency, currencySymbol };
};

const mapDispatchToProps = (dispatch) => {
  const arrangeCart = (data) => dispatch(setArrangedCart(data));
  const addToCart = (product) => dispatch(setCartItem(product));
  const removeFromCart = (product) => dispatch(removeCartItem(product));
  const clear = () => dispatch(clearCart());

  return { arrangeCart, addToCart, removeFromCart, clear };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
