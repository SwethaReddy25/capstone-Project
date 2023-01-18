import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { AuthService } from '../user/auth.service';
import { CState } from 'src/app/state/cart/cart.state';
import { Store } from '@ngrx/store';
import * as CartActions from '../state/cart/cart.actions';
import { getCart } from '../state/cart/cart.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  noOfItems!:number;
  title:string='InstaSmart';
  constructor(private authService: AuthService,public router:Router,private CartStore: Store<CState>) { }
  ngOnInit(): void {

    
    // Here we are fetching the cart store to display the no of items beside cart in nav bar.

    this.CartStore.select(getCart).subscribe(data => {
      console.log(data); 
      this.noOfItems=data[0].products.length;
    });


  }

  // This function will be called when we click on cart icon ,and if the cart is not empty ,it will 
  //take us to cart page and if the cart is empty ,it wont.

  goToCart(){
    console.log("in gotocart");
    if(this.noOfItems!=0)this.router.navigate(['cart']);
  }

  // This getter function is used to check if any user is logged in or not with the help of authService

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

    // This getter function is used to fetch the logged in username with the help of authService
  get username():any{
    return this.authService.currentUser?.userName;
    }

  // This getter function is used to check if the logged in user is admin or not with the help of authService

    get isAdmin():any{
      return this.authService.currentUser?.isAdmin;
      }

  // This function will be called when user clicks on logout button      
  logOut() {
    this.authService.logOut();
  }
}
