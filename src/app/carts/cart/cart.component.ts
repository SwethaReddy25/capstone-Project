import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Category, IProduct } from 'src/app/products/product.model';
import { CartService } from 'src/app/shared/cart.service';
import { getCart } from 'src/app/state/cart/cart.selectors';
import { CState } from 'src/app/state/cart/cart.state';
import { AuthService } from 'src/app/user/auth.service';
import * as CartActions from '../../state/cart/cart.actions';
import { ICart } from '../cart.model';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  products!: IProduct[];
  totalPrice:number = 0;
  cart$!: Observable<ICart[]>;
  cart!: ICart;
  noOfItems!:number;
  constructor(private cartService: CartService, private authService: AuthService, private router: Router, private CartStore: Store<CState> ) { 

  }

  ngOnInit(): void{

    console.log("in cart init");
    this.CartStore.dispatch(CartActions.loadCart());
    this.cart$ = this.CartStore.select(getCart);
    this.cart$.subscribe(data => {
      console.log(data); this.cart = data[0];
      this.products=this.cart.products;
      this.totalPrice=this.cart.totalPrice;
      this.noOfItems=data[0]?.products?.length;
    });


  }

  plus(id:number){

 
    let new_products = this.products.map(p => p.id == id ? {...p, qty : p.qty+1} : p);

    console.log(new_products);
    console.log(this.products);


    this.totalPricefn(new_products);

    this.CartStore.dispatch(CartActions.updateCart({  cart: {...this.cart,products:new_products ,totalPrice:this.totalPrice }}));
    
    

  }
  minus(id:number){
    let new_products = this.products.map(p => p.id == id && p.qty>1 ? {...p, qty : p.qty-1} : p);

    console.log(new_products);
  
    console.log(this.products);
    this.totalPricefn(new_products);


    this.CartStore.dispatch(CartActions.updateCart({  cart: {...this.cart,products:new_products ,totalPrice:this.totalPrice}}));
    // this.totalPrice();


  } 
  remove(id:number){

    let new_products = this.products.filter(p => p.id != id );

    this.totalPricefn(new_products);

    this.CartStore.dispatch(CartActions.updateCart({  cart: {...this.cart,products:new_products ,totalPrice:this.totalPrice}}));



  }
  totalPricefn(productArr:IProduct[]){
    this.totalPrice = 0;
    for(var i=0;i<productArr.length;i++){
      this.totalPrice += (productArr[i].price * productArr[i].qty);
    }
    console.log("total",this.totalPrice);
  }
  
  isCartEmpty(){
    // console.log("is cart empty ",this.cart?.products?.length==0);
    return this.noOfItems;
  }


}
