import React, { Component } from "react";
import style from "./ChosenAttribute.module.css";

class ChosenAttribute extends Component {
  state = {};

  render() {
    return (
      <div
        className={
          this.props.type === "overlay" ? style.attributeContainer : ""
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
                            <h3
                              key={Math.random()}
                              className={`${style.attribute} ${style.selected}`}
                            >
                              {item.value}
                            </h3>
                          );
                        } else {
                          return (
                            <h3 key={Math.random()} className={style.attribute}>
                              {item.value}
                            </h3>
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

export default ChosenAttribute;
