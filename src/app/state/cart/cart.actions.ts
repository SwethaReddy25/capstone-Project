
/* NgRx */
import { createAction, props } from '@ngrx/store';
import { ICart } from 'src/app/carts/cart.model';
import { IProduct } from 'src/app/products/product.model';



export const loadCart= createAction(
  '[Cart] Load'
);

export const loadCartSuccess = createAction(
  '[Cart] Load Success',
  props<{ cart: ICart[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Fail'
);

export const updateCart = createAction(
  '[Cart] Update Cart',
  props<{ cart: ICart }>()
);

export const updateCartSuccess = createAction(
  '[Cart] Update Cart Success',
  props<{ updatedCart: ICart }>()
);

export const updateCartFailure = createAction(
  '[Cart] Update Cart Fail',
  props<{ error: string }>()
);


// export const setCurrentProduct = createAction(
//   '[Product] Set Current Product',
//   props<{ currentProductId: number }>()
// );

// export const clearCurrentProduct = createAction(
//   '[Product] Clear Current Product'
// );

// export const initializeCurrentProduct = createAction(
//   '[Product] Initialize Current Product'
// );

// export const updateProduct = createAction(
//   '[Product] Update Product',
//   props<{ product: IProduct }>()
// );

// export const updateProductSuccess = createAction(
//   '[Product] Update Product Success',
//   props<{ product: IProduct }>()
// );

// export const updateProductFailure = createAction(
//   '[Product] Update Product Fail',
//   props<{ error: string }>()
// );

// export const addCart = createAction(
//   '[Cart] Add a Cart' ,
//   props<{cart:ICart}>()
// )


// export const addCartSuccess = createAction(
//   '[Cart] Add Cart Success',
//   props<{ cart: ICart }>()
// );


// export const createProduct = createAction(
//   '[Product] Create Product',
//   props<{ product: IProduct }>()
// );



// export const createProductFailure = createAction(
//   '[Product] Create Product Fail',
//   props<{ error: string }>()
// );

// export const deleteProduct = createAction(
//   '[Product] Delete Product',
//   props<{ productId: number }>()
// );

// export const deleteProductSuccess = createAction(
//   '[Product] Delete Product Success',
//   props<{ productId: number }>()
// );

// export const deleteProductFailure = createAction(
//   '[Product] Delete Product Fail',
//   props<{ error: string }>()
// );
