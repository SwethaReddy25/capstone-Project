import { createFeatureSelector, createSelector, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/products/product.model';
import * as AppState from '../../state/app.state';
import { CartState } from './cart.state';



// Selector functions
const getCartFeatureState = createFeatureSelector<CartState>('cart');

// export const getCurrentProductId = createSelector(
//   getCartFeatureState,
//   state => state.currentProductId
// );

// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   getCurrentProductId,
//   (state, currentProductId) => {

//     if (currentProductId === 0) {
//       return {
//         id:0,
//         name:'',
//         category:Category.fruits,
//         price:0,
//         image:'',
//         rating:1,
//         qty:0
//       };
//     } else {
//       return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
//     }
//   }
// );

export const getCart= createSelector(
  getCartFeatureState,
  state => state.cart
);

// export const getError = createSelector(
//   getProductFeatureState,
//   state => state.error
// );

