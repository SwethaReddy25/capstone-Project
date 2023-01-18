import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
pageTitle:string='LOGIN';

  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [, [Validators.required]],
      password: [, [Validators.required]],
    });
  }

  //This function will take us back to homepage
  cancel():void{
    this.router.navigate(['home']);
  }


  //This function will be called when the login form is submitted
  onSubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm && this.loginForm.valid){

      const username = this.loginForm.value.username;
      const password=this.loginForm.value.password;
      this.authService.login(username,password);

      if(this.authService.redirectToUrl){
        console.log(this.authService.redirectToUrl)
        this.router.navigateByUrl(this.authService.redirectToUrl);
      }
      else{
        console.log('in login else')
        this.router.navigate(['products']);
      }
    }
  }
}
