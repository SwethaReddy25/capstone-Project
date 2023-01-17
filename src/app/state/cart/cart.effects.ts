import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../shared/product.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';
import { CartService } from 'src/app/shared/cart.service';

@Injectable()
export class CartEffects {

  constructor(private actions$: Actions, private cartService: CartService) { }



  loadCart$ = createEffect(() => {
    console.log("in load cart");
    return this.actions$
      .pipe(
        ofType(CartActions.loadCart),
        mergeMap(() => this.cartService.getCart()
          .pipe(
            map(cart => {
              console.log(cart);
              return CartActions.loadCartSuccess({ cart })
            }),
            catchError(error => of(CartActions.loadCartFailure()))
          )
        )
      );
  });

  updateCart$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CartActions.updateCart),
        concatMap(action => {
          console.log(action);
          return this.cartService.updateCart(action.cart)
            .pipe(
              map(updatedCart => {
                console.log(updatedCart);
                return CartActions.updateCartSuccess({ updatedCart })
              }
              ),
              catchError(error => of(CartActions.updateCartFailure({ error })))
            )
        }
        )
      );
  });


  // addCart$ = createEffect(() => {
  //   return this.actions$
  //     .pipe(
  //       ofType(CartActions.addCart),
  //       concatMap(payload =>
  //         this.cartService.addCart(payload.cart)
  //           .pipe(
  //             map(cart => CartActions.addCartSuccess({ cart }))
  //           )
  //       )
  //     );
  // });


  //   deleteProduct$ = createEffect(() => {
  //     return this.actions$
  //       .pipe(
  //         ofType(ProductActions.deleteProduct),
  //         mergeMap(action =>
  //           this.productService.deleteProduct(action.productId).pipe(
  //             map(() => ProductActions.deleteProductSuccess({ productId: action.productId })),
  //             catchError(error => of(ProductActions.deleteProductFailure({ error })))
  //           )
  //         )
  //       );
  //   });
}
