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
  total:number = 0;
  cart$!: Observable<ICart[]>;
  cart!: ICart;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router, private CartStore: Store<CState> ) { 
  //   this.products=[ {
  //     "id": 1,
  //     "name": "Carrot",
  //     "code": "CO11",
  //     "price": 500,
  //     "image": "../../assets/images/carrot.png",
  //     "category": Category.vegetables,
  //     "desc": "Rich source of dietary carotenoids.",
  //     "discount": 40,
  //     "qty":2
  //   },
  //   {
  //     "id": 2,
  //     "name": "Spinach",
  //     "code": "QW712",
  //     "price": 600,
  //     "image": "../../assets/images/spinach.jpg",
  //     "category": Category.vegetables,
  //     "desc": "Strengthens the immune System.",
  //     "discount": 40,
  //     "qty":3
  //   },
  //   {
  //     "id": 3,
  //     "name": "Tomato",
  //     "code": "CD12",
  //     "price": 350,
  //     "image": "../../assets/images/tamoto.jpg",
  //     "category": Category.vegetables,
  //     "desc": "Tomates are a good source of several vitamins and mincerals.",
  //     "discount": 40,
  //     "qty":4
  //   },
  //   {
  //     "id": 4,
  //     "name": "Brinjal",
  //     "code": "BD13",
  //     "price": 550,
  //     "image": "../../assets/images/bringal",
  //     "category": Category.vegetables,
  //     "desc": "Helps to lower the risk of many heart diseases.",
  //     "discount": 40,
  //     "qty":4
  //   },
  //   {
  //     "id": 5,
  //     "name": "Beetroot",
  //     "code": "BT14",
  //     "price": 350,
  //     "image": "../../assets/images/beetroot.jpg",
  //     "category": Category.vegetables,
  //     "desc": "Could help keep your blood pressure in check.",
  //     "discount": 40,
  //     "qty":2
  //   }
  // ];
  }

  ngOnInit(): void{

    console.log("in cart init");
    this.CartStore.dispatch(CartActions.loadCart());
    this.cart$ = this.CartStore.select(getCart);
    this.cart$.subscribe(data => {
      console.log(data); this.cart = data[0];
      this.products=this.cart.products;
      this.total=this.cart.totalPrice;
    });



  }

  plus(id:number){

 
    let new_array = this.products.map(p => p.id == id ? {...p, qty : p.qty+1} : p);

    console.log(new_array);
  
    console.log(this.products);

    this.CartStore.dispatch(CartActions.updateCart({  cart: {...this.cart,products:new_array }}));
    
    this.totalPrice();

  }
  minus(id:number){
    let new_array = this.products.map(p => p.id == id && p.qty>1 ? {...p, qty : p.qty-1} : p);

    console.log(new_array);
  
    console.log(this.products);

    this.CartStore.dispatch(CartActions.updateCart({  cart: {...this.cart,products:new_array }}));
    // this.totalPrice();


  } 
  remove(id:number){

  }
  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.products.length;i++){
      this.total += (this.products[i].price * this.products[i].qty);
    }
    console.log("total",this.total);
  }
  

}
