
import { ICart } from 'src/app/carts/cart.model';
import * as AppState from '../../state/app.state';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.


export interface CState extends AppState.State {
  cart: CartState;
}

export interface CartState {
  cart:ICart[],
  error: string;
}

export const initialState: CartState = {
  cart: [{
    id: 0,
    products: [],
    totalPrice: 0
  }],
  error: ''
}
