import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './user/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule,httpClientInMemBackendServiceFactory } from 'angular-in-memory-web-api';
import { InMemoryAppDbService } from './shared/Inmemoryappdbservice';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreModule } from '@ngrx/store';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { cartReducer } from '../app/state/cart/cart.reducer';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RouterModule } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    PaymentComponent,
    PagenotfoundComponent    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({'cart':cartReducer}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument(),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryAppDbService),
    RouterModule,
    MatFormFieldModule
  
    

  ],
  providers: [],
  bootstrap: [AppComponent] , 
  exports:[RouterModule]
})
export class AppModule { }
