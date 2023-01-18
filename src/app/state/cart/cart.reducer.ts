import { createReducer, on } from "@ngrx/store";
import { initialState } from "./cart.state";
import { CartState } from "./cart.state";
import * as CartActions from './cart.actions'

export const cartReducer = createReducer<CartState>(
  initialState,



  on(CartActions.loadCartSuccess, (state, payload): CartState => {
    return {
      ...state,
      cart: payload.cart,
      error: ''
    };
  }),


  on(CartActions.updateCartSuccess, (state, payload): CartState => {
    console.log(payload);
    return {
      ...state,
      cart: [payload.updatedCart],
      error: ''
    };
  }),


);
