import React, { Component } from "react";
import style from "./SwatchAttribute.module.css";

class SwatchAttribute extends Component {
  state = {};
  select = (e) => {
    document.querySelectorAll(`.option${this.props.id}`).forEach((item) => {
      item.classList.remove(`${style.selected}`);
      item.classList.remove(`selectedSwatchAttribute`);
    });
    e.target.classList.add(`${style.selected}`);
    e.target.classList.add(`selectedSwatchAttribute`);
    e.target.classList.remove(`${style.attribute}`);
  };

  render() {
    return (
      <div>
        <h3>{this.props.data.name}:</h3>
        <div className={style.attributeHolder}>
          {this.props.data !== undefined
            ? this.props.data.items.map((item) => (
                <div
                  key={item.displayValue}
                  className={`${style.attribute} option${this.props.id}`}
                  data-value={item.displayValue}
                  data-name={this.props.data.name}
                  style={{ backgroundColor: `${item.value}` }}
                  onClick={this.select}
                ></div>
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default SwatchAttribute;
