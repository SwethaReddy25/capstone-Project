import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../carts/cart/cart.component';
import { CartRoutingModule } from './cart.routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from '../state/cart/cart.effects';
import { cartReducer } from '../../app/state/cart/cart.reducer';
import { productReducer } from '../../app/state/products/product.reducer';
import { ProductEffects } from '../state/products/product.effects';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    StoreModule.forFeature('cart', cartReducer),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([CartEffects,ProductEffects])
    
  ]
})
export class CartModule { }
