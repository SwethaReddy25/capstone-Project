import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  noOfItems!:number;
  constructor(private authService: AuthService,private router:Router) { }
  ngOnInit(): void {

    console.log(this.username);
    console.log(this.isLoggedIn);
    this.noOfItems=1;

  }


  goToCart(){
    console.log("in gotocart");
    if(this.noOfItems!=0)this.router.navigate(['cart']);
  }


  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get username():any{
    return this.authService.currentUser?.userName;
    }


    get isAdmin():any{
      return this.authService.currentUser?.isAdmin;
      }

  logOut() {
    this.authService.logOut();
  }
}
