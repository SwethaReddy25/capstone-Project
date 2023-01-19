import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from '../material-module/material.module';

import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,ReactiveFormsModule,MaterialModule,RouterTestingModule,BrowserAnimationsModule],
      declarations: [ PaymentComponent ],
      providers: [provideMockStore({})],

    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have an input field with id card number.', () => {

    const el = fixture.debugElement.query(By.css('#cardNumber'));

    expect(el).toBeTruthy();

  });



  it('should have an input field with id card number of type number.', () => {

    const el = fixture.debugElement.query(By.css('#cardNumber'));

    expect(el.nativeElement.getAttribute('type')).toEqual('number');

  });




  it('should have an input field with id cvv.', () => {

    const el = fixture.debugElement.query(By.css('#cvv'));

    expect(el).toBeTruthy();

  });




  it('should have an input field with id cvv of type number', () => {

    const el = fixture.debugElement.query(By.css('#cvv'));

    expect(el.nativeElement.getAttribute('type')).toEqual('number');

  });




  it('should have an input field with id cardholdername.', () => {

    const el = fixture.debugElement.query(By.css('#cardHolderName'));

    expect(el).toBeTruthy();

  });




  it('should have an input field with id cardholdername of type text.', () => {

    const el = fixture.debugElement.query(By.css('#cardHolderName'));

    expect(el.nativeElement.getAttribute('type')).toEqual('text');

  });
});
