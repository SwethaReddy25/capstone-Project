import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CState } from 'src/app/state/cart/cart.state';
import * as CartActions from '../state/cart/cart.actions';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup = new FormGroup({});
  paymentSuccessful!:boolean;
  constructor(private fb: FormBuilder,private CartStore: Store<CState>) { }

  ngOnInit(): void {

    this.paymentForm = this.fb.group({

      cardNumber: [, [Validators.required,Validators.min(100000000), Validators.max(999999999)]],

      expiryDate: [, [Validators.required]],

      cvvNumber: [, [Validators.required, Validators.min(100), Validators.max(999)]],

      cardHolderName: [, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],

    });
    // this.form.errors
    this.paymentSuccessful=false;
  }
  get cardNumber() {
    return this.paymentForm.get('cardNumber');
  }


  onSubmit(){
    this.CartStore.dispatch(CartActions.updateCart({  cart: { id:0,products:[] ,totalPrice:0 }}));
    console.log(this.paymentSuccessful);
    this.paymentSuccessful=true;
    console.log(this.paymentSuccessful);
  }

}



