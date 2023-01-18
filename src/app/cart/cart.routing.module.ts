import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



// This is the routing file for cart module which can loaded in app routing file

const cartRoutes: Routes = [
  ];

@NgModule({

    imports: [
        RouterModule.forChild(cartRoutes),
    ],
    exports:[RouterModule]
    
})

export class CartRoutingModule{

}