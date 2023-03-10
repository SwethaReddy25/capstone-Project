import { createFeatureSelector, createSelector, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/products/product.model';
import * as AppState from '../../state/app.state';
import { initialState } from './product.state';
import { ProductState } from './product.state';


// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {

    if (currentProductId === 0) {
      return {
        id:0,
        name:'',
        code:'',
        category:Category.fruits,
        price:0,
        image:'',
        desc:'',
        qty:0,
        discount:0
      };
    } else {
      return currentProductId ? state.products.find(p =>
        { 
          if(p.id==currentProductId){
            console.log(p);
            // p.id === currentProductId
          }
          return p.id===currentProductId;
        }) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

