import React, { Component } from "react";
import style from "./ChosenSwatchAttribute.module.css";

class ChosenSwatchAttribute extends Component {
  state = {};
  render() {
    return (
      <div
        className={
          this.props.type === "overlay" ? style.swatchAttributeContainer : ""
        }
      >
        {this.props.data.attributes !== undefined
          ? this.props.data.attributes.map((item) => {
              if (item.name === this.props.chosen.name) {
                return (
                  <React.Fragment>
                    <h3>{item.name}:</h3>
                    <div className={style.attributeHolder}>
                      {item.items.map((item) => {
                        if (item.displayValue === this.props.chosen.value) {
                          return (
                            <div
                              key={Math.random()}
                              className={`${style.attribute} ${style.selected}`}
                              style={{ backgroundColor: `${item.value}` }}
                            ></div>
                          );
                        } else {
                          return (
                            <div
                              key={Math.random()}
                              className={style.attribute}
                              style={{ backgroundColor: `${item.value}` }}
                            ></div>
                          );
                        }
                      })}
                    </div>
                  </React.Fragment>
                );
              }
              return "";
            })
          : ""}
      </div>
    );
  }
}

export default ChosenSwatchAttribute;
