import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product.routing.module';
import { StoreModule } from '@ngrx/store';
import { productReducer } from '../../app/state/products/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '../state/products/product.effects';
import { ProductManageComponent } from '../products/product-manage/product-manage.component';
import { CartEffects } from '../state/cart/cart.effects';
import { cartReducer } from '../../app/state/cart/cart.reducer';

//Here we have created a separate module for product which is having ProductListComponent and
// ProductManageComponent


@NgModule({
  declarations: [
    ProductListComponent,
    ProductManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    StoreModule.forFeature('products', productReducer),
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffects,ProductEffects])

  ],
  exports:[
    
  ]

})
export class ProductModule { }
