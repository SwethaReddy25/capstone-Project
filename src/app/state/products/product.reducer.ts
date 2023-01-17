import { createReducer, on } from "@ngrx/store";
import { initialState } from "./product.state";
import { ProductState } from "./product.state";
import * as ProductActions from './product.actions'

export const productReducer = createReducer<ProductState>(
  initialState,
  
  on(ProductActions.setCurrentProduct, (state, payload): ProductState => {
    return {
      ...state,
      currentProductId: payload.currentProductId
    };
  }),

  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, payload): ProductState => {
    return {
      ...state,
      products: payload.products,
      error: ''
    };
  }),
  on(ProductActions.loadProductsFailure, (state, payload): ProductState => {
    return {
      ...state,
      products: [],
      error: payload.error
    };
  }),

  on(ProductActions.updateProductSuccess, (state, payload): ProductState => {
    const updatedProducts = state.products.map(
      item => payload.product.id === item.id ? payload.product : item);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: payload.product.id,
      error: ''
    };
  }),

  on(ProductActions.updateProductFailure, (state, payload): ProductState => {
    return {
      ...state,
      error: payload.error
    };
  }),

  // After a create, the currentProduct is the new product.
  on(ProductActions.createProductSuccess, (state, payload): ProductState => {
    return {
      ...state,
      products: [...state.products, payload.product],
      currentProductId: payload.product.id,
      error: ''
    };
  }),
  on(ProductActions.createProductFailure, (state, payload): ProductState => {
    return {
      ...state,
      error: payload.error
    };
  }),
  // After a delete, the currentProduct is null.

  on(ProductActions.deleteProductSuccess, (state, payload): ProductState => {
    return {
      ...state,
      products: state.products.filter(product => product.id !== payload.productId),
      currentProductId: null,
      error: ''
    };
  }),
  
  on(ProductActions.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    };
  })
);
