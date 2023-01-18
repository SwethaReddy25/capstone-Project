import { createFeatureSelector, createSelector, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/products/product.model';
import * as AppState from '../../state/app.state';
import { CartState } from './cart.state';



// Selector functions
const getCartFeatureState = createFeatureSelector<CartState>('cart');

export const getCart= createSelector(
  getCartFeatureState,
  state => state.cart
);


