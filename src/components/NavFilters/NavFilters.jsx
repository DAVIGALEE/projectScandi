import React, { Component } from "react";
import style from "./NavFilters.module.css";
import { getCategories } from "../queries/queries";
import { connect } from "react-redux";
import { setCategory } from "../redux/actions/actions";

class NavFilters extends Component {
  state = {
    categories: [],
    category: this.props.category,
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getData = async () => {
    let temp = await getCategories();
    this.setState({
      categories: temp,
    });
    switch (this.state.category) {
      case "All":
      case "all":
        document.getElementById("all").classList.add(`${style.active}`);
        break;
      case "Clothes":
      case "clothes":
        document.getElementById("clothes").classList.add(`${style.active}`);
        break;
      case "Tech":
      case "tech":
        document.getElementById("tech").classList.add(`${style.active}`);
        break;
      default:
        return;
    }
  };

  componentDidMount() {
    this.getData();
  }

  chooseCategory = (e) => {
    if (this.props.status === "deny") {
      return;
    }

    document.querySelectorAll(".option").forEach((item) => {
      item.classList.remove(`${style.active}`);
    });
    e.target.classList.add(`${style.active}`);

    this.props.changeCategory(e.target.dataset.category);
  };

  render() {
    return (
      <div className={style.filters}>
        {this.state.categories.map((item) => (
          <h2
            key={item.name}
            id={item.name}
            data-category={this.capitalizeFirstLetter(item.name)}
            className={`${style.filter} option`}
            onClick={this.chooseCategory}
          >{`${this.capitalizeFirstLetter(item.name)}`}</h2>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const category = state.centralState.category;

  return { category };
};

const mapDispatchToProps = (dispatch) => {
  const changeCategory = (category) => dispatch(setCategory(category));

  return { changeCategory };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavFilters);
