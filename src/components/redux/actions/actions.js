export const setCurrency = (symbol, label) => {
  return {
    type: "SET_CURRENCY",
    payload: {
      currencySymbol: symbol,
      currencyLabel: label,
    },
  };
};

export const setCategory = (category) => {
  return {
    type: "SET_CATEGORY",
    payload: {
      category: category,
    },
  };
};

export const setCartItem = (data) => {
  return {
    type: "SET_CART_ITEM",
    payload: {
      data: data,
    },
  };
};

export const removeCartItem = (data) => {
  return {
    type: "REMOVE_CART_ITEM",
    payload: {
      data: data,
    },
  };
};

export const setArrangedCart = (data) => {
  return {
    type: "SET_ARRANGED_CART",
    payload: {
      data: data,
    },
  };
};

export const getCart = () => {
  return {
    type: "GET_CART",
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
