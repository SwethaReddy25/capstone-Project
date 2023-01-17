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


//  on(CartActions.addCartSuccess, (state, payload): CartState => {
//     return {
//       ...state,
//       id:payload.id,
//       products: payload.cart.products,
//       count:payload.cart.count,
      
//       error: ''
//     };
//   }),

  
    // on(CartActions.addToCart,(state,payload): CartState =>{
    //   return {
    //     ...state,

    //   }
    // })


  // on(ProductActions.setCurrentProduct, (state, payload): ProductState => {
  //   return {
  //     ...state,
  //     currentProductId: payload.currentProductId
  //   };
  // }),

  // on(ProductActions.clearCurrentProduct, (state): ProductState => {
  //   return {
  //     ...state,
  //     currentProductId: null
  //   };
  // }),
  // on(ProductActions.initializeCurrentProduct, (state): ProductState => {
  //   return {
  //     ...state,
  //     currentProductId: 0
  //   };
  // }),
  
  // on(ProductActions.loadProductsFailure, (state, payload): ProductState => {
  //   return {
  //     ...state,
  //     products: [],
  //     error: payload.error
  //   };
  // }),


  // on(ProductActions.updateProductFailure, (state, payload): ProductState => {
  //   return {
  //     ...state,
  //     error: payload.error
  //   };
  // }),

  // // After a create, the currentProduct is the new product.
 
  // on(ProductActions.createProductFailure, (state, payload): ProductState => {
  //   return {
  //     ...state,
  //     error: payload.error
  //   };
  // }),
  // // After a delete, the currentProduct is null.

  // on(ProductActions.deleteProductSuccess, (state, payload): ProductState => {
  //   return {
  //     ...state,
  //     products: state.products.filter(product => product.id !== payload.productId),
  //     currentProductId: null,
  //     error: ''
  //   };
  // }),
  
  // on(ProductActions.deleteProductFailure, (state, action): ProductState => {
  //   return {
  //     ...state,
  //     error: action.error
  //   };
  // })
);
