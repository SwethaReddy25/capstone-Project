import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './carts/cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AuthGuard } from './user/auth-guard.service';
import { LoginComponent } from './user/login/login.component';


const routerOptions: ExtraOptions = {
  // scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

const routes: Routes = [
  {
    path: '', component: MenuComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login',component:LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      {
        path: 'products', component: ProductListComponent, canActivate: [AuthGuard],
        loadChildren: () => import('../app/product/product.module').then(p => p.ProductModule)
      },
      {
        path: 'cart', component: CartComponent,
        loadChildren: () => import('../app/cart/cart.module').then(p => p.CartModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
