import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { ProductManageComponent } from "../products/product-manage/product-manage.component";
const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
  };
  
const productRoutes: Routes = [
    {  path: 'manageProduct', component: ProductManageComponent }
  ];

@NgModule({

    imports: [
        RouterModule.forChild(productRoutes),
    ],
    exports:[RouterModule]
    
})

export class ProductRoutingModule{

}