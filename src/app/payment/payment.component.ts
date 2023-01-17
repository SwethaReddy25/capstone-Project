import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
 
    form: FormGroup = new FormGroup({});
  
    constructor(private fb: FormBuilder) { }
  
    ngOnInit(): void {
  
      this.form = this.fb.group({
  
        cardNumber: [null, [Validators.required,Validators.minLength(3)]],
  
        expiryDate: [null, [Validators.required]], 
  
        cvvNumber: [null, [Validators.required]],

        cardHolderName : [null, [Validators.required]],
  
  
  });
  
    }

  
  }
  


