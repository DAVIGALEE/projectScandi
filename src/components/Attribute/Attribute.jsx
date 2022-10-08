import React, { Component } from "react";
import style from "./Attribute.module.css";

class Attribute extends Component {
  state = {};

  select = (e) => {
    document.querySelectorAll(`.option${this.props.id}`).forEach((item) => {
      item.classList.remove(`${style.selected}`);
      item.classList.remove(`selectedAttribute`);
    });
    e.target.classList.add(`${style.selected}`);
    e.target.classList.add(`selectedAttribute`);
    e.target.classList.remove(`${style.attribute}`);
  };

  render() {
    return (
      <div>
        <h3>{this.props.data.name}:</h3>
        <div className={style.attributeHolder}>
          {this.props.data !== undefined
            ? this.props.data.items.map((item) => (
                <h3
                  key={item.displayValue}
                  className={`${style.attribute} option${this.props.id}`}
                  data-value={item.displayValue}
                  data-name={this.props.data.name}
                  onClick={this.select}
                >
                  {item.value}
                </h3>
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default Attribute;
