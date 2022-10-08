const getFromLocalStorage = (type) => {
  switch (type) {
    case "currencyLabel":
      let currencyLabel = localStorage.getItem("currencyLabel");
      if (currencyLabel === null) {
        return "USD";
      }
      return currencyLabel;
    case "currencySymbol":
      let currencySymbol = localStorage.getItem("currencySymbol");
      if (currencySymbol === null) {
        return "$";
      }
      return currencySymbol;
    case "category":
      let category = localStorage.getItem("category");
      if (category === null) {
        return "all";
      }
      return category;
    case "cart":
      let cart = localStorage.getItem("cart");
      if (cart === null) {
        return [];
      }
      return JSON.parse(cart);
    case "quantity":
      let quantity = localStorage.getItem("quantity");
      if (quantity === null) {
        return 0;
      }
      return parseInt(quantity);
    default:
      return;
  }
};

let initialState = {
  category: getFromLocalStorage("category"),
  currencySymbol: getFromLocalStorage("currencySymbol"),
  currencyLabel: getFromLocalStorage("currencyLabel"),
  cart: getFromLocalStorage("cart"),
  quantity: getFromLocalStorage("quantity"),
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENCY":
      localStorage.setItem("currencyLabel", action.payload.currencyLabel);
      localStorage.setItem("currencySymbol", action.payload.currencySymbol);
      return {
        ...state,
        currencySymbol: action.payload.currencySymbol,
        currencyLabel: action.payload.currencyLabel,
      };
    case "SET_CATEGORY":
      localStorage.setItem("category", action.payload.category);
      return {
        ...state,
        category: action.payload.category,
      };
    case "SET_CART_ITEM":
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cart, action.payload.data])
      );
      localStorage.setItem("quantity", state.quantity + 1);
      return {
        ...state,
        cart: [...state.cart, action.payload.data],
        quantity: state.quantity + 1,
      };
    case "REMOVE_CART_ITEM":
      let newCart = state.cart;
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i] === action.payload.data) {
          newCart.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("cart", JSON.stringify([...newCart]));
      localStorage.setItem("quantity", state.quantity - 1);
      return {
        ...state,
        cart: [...newCart],
        quantity: state.quantity - 1,
      };
    case "SET_ARRANGED_CART":
      return {
        ...state,
        arrangedCart: action.payload.data,
      };
    case "GET_CART":
      return state.cart;
    case "CLEAR_CART":
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("quantity", 0);
      return {
        ...state,
        cart: [],
        arrangedCart: [],
        quantity: 0,
      };
    default:
      return state;
  }
};

export default mainReducer;
