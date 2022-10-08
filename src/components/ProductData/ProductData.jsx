import React, { Component } from "react";
import { getProduct } from "../queries/queries";
import style from "./ProductData.module.css";
import parse from "html-react-parser";
import { connect } from "react-redux";
import Attribute from "../Attribute/Attribute";
import SwatchAttribute from "../SwatchAttribute/SwatchAttribute";
import { setCartItem } from "../redux/actions/actions";

class ProductData extends Component {
  state = {
    productData: {},
  };

  getData = async () => {
    let temp = await getProduct(window.location.href.split("/")[4]);
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
        if (this.state.productData.prices !== undefined) {
          chosenCurrency = this.state.productData.prices.filter(
            (item) => item.currency.label === this.props.currency
          );
          return `${this.props.currencySymbol}${chosenCurrency[0].amount}`;
        } else {
          return;
        }
    }
  };

  setCart = () => {
    let totalAttributeNumbers = this.state.productData.attributes.length;
    let currentAttributeNumbers = 0;
    const productAttributes =
      document.getElementsByClassName("selectedAttribute");
    const productSwatchAttributes = document.getElementsByClassName(
      "selectedSwatchAttribute"
    );
    Array.from(productAttributes).forEach(() => (currentAttributeNumbers += 1));
    Array.from(productSwatchAttributes).forEach(
      () => (currentAttributeNumbers += 1)
    );

    if (currentAttributeNumbers === totalAttributeNumbers) {
      document.getElementById("proceedToCart").style.display = "none";
      this.addToCart();
    } else {
      document.getElementById("proceedToCart").style.display = "block";
    }
  };

  addToCart = () => {
    let data = this.state.productData;
    let product = {
      id: data.id,
      name: data.name,
      brand: data.brand,
      prices: data.prices,
      gallery: data.gallery,
      attributes: [],
      swatchAttributes: [],
    };
    const productAttributes =
      document.getElementsByClassName("selectedAttribute");
    const productSwatchAttributes = document.getElementsByClassName(
      "selectedSwatchAttribute"
    );
    Array.from(productAttributes).forEach((item) => {
      product.attributes.push({
        name: item.dataset.name,
        value: item.dataset.value,
      });
    });
    Array.from(productSwatchAttributes).forEach((item) => {
      product.swatchAttributes.push({
        name: item.dataset.name,
        value: item.dataset.value,
      });
    });

    this.props.addToCart(product);
  };

  attributesSetup = (product, type) => {
    let data = "";
    if (product !== undefined) {
      if (type === "Text") {
        data = product.filter((item) => item.type === "text");
        return data.map((item) => (
          <Attribute
            key={Math.random()}
            id={Math.floor(Math.random() * 100)}
            data={item}
          />
        ));
      } else if (type === "Swatch") {
        data = product.filter((item) => item.type === "swatch");
        return data.map((item) => (
          <SwatchAttribute
            key={Math.random()}
            id={Math.floor(Math.random() * 100)}
            data={item}
          />
        ));
      }
    }
  };

  setImg = (e) => {
    let src = e.target.src;
    document.getElementById("MainImg").src = src;
  };

  checkStock = () => {
    if (this.state.productData.inStock !== undefined) {
      if (this.state.productData.inStock !== true) {
        return <button className={style.cartAddNoStock}>Out of Stock</button>;
      } else {
        return (
          <button className={style.cartAdd} onClick={this.setCart}>
            Add to Cart
          </button>
        );
      }
    }
  };

  render() {
    const data = this.state.productData;
    const description = `${data.description}`;
    const parsedDescription = parse(description);
    const productAttributes = data.attributes;

    return (
      <div className={style.productArea}>
        <div className={style.imgs}>
          {data.gallery !== undefined
            ? data.gallery.map((item) => (
                <img
                  src={item}
                  alt={data.id}
                  key={Math.random()}
                  onClick={this.setImg}
                />
              ))
            : ""}
        </div>
        <div className={style.mainImgHolder}>
          {data.gallery !== undefined ? (
            <img
              id="MainImg"
              className={style.mainImg}
              src={data.gallery[0]}
              alt="Main Product"
            />
          ) : (
            ""
          )}
        </div>
        <div className={style.details}>
          <h2>{data.name}</h2>
          <h3 className={style.brand}>{data.brand}</h3>
          {this.attributesSetup(productAttributes, "Text")}
          {this.attributesSetup(productAttributes, "Swatch")}
          <h3>{this.setCurrency(this.props.currency)}</h3>
          <p className={style.proceedToCart} id="proceedToCart">
            Please Choose from the available options
          </p>
          {this.checkStock()}
          {parsedDescription}
        </div>
      </div>
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

const mapdispatchToProps = (dispatch) => {
  const addToCart = (product) => dispatch(setCartItem(product));

  return { addToCart };
};

export default connect(mapStateToProps, mapdispatchToProps)(ProductData);
