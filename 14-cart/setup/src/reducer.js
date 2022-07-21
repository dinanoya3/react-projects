// state - current state before the update
// action - the functionality to update the state

// EVERY TIME AN ARRAY METHOD IS USED IT IS ITERATING THE OLD STATE!!
// state.cart is always current/old state
const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    //   state.cart is state BEFORE UPDATE
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      // if id doesnt match, return cartItems
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        // console.log(price, amount);
        const itemTotal = price * amount;
        // console.log(cartTotal);

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      // below is the cartTotal OBJECT
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    // override total and amount
    return { ...state, total: total, amount: amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  // INCREASE/DECREASE REFACTORING (optional)
  // if (action.type === "TOGGLE_AMOUNT") {
  //   let tempCart = state.cart
  //     .map((cartItem) => {
  //       if (cartItem.id === action.payload.id) {
  //         if (action.payload.type === "inc") {
  //           return { ...cartItem, amount: cartItem.amount + 1 };
  //         }
  //         if (action.payload.type === "dec") {
  //           return { ...cartItem, amount: cartItem.amount - 1 };
  //         }
  //       }
  //       return cartItem;
  //     })
  //     .filter((cartItem) => cartItem.amount !== 0);
  //   return { ...state, cart: tempCart };
  // }

  // throw new Error("no matching action type");
  return state;
};

export default reducer;
