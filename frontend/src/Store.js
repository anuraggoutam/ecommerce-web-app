import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      //add to cart
      //newItem contain new quantity
      const newItem = action.payload;//obj
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      ); //get exist item
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.id === existItem.id ? newItem : item
          ) // ________condition_______? if true  :  if false ;       :
        : //if item exists then update existing item with new item else update new item
          [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, cartItems } };//addinng new modify array in cart

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

