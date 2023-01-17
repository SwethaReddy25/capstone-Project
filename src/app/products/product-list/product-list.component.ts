import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';
import { getProducts } from 'src/app/state/products/product.selectors';
import { CState } from 'src/app/state/cart/cart.state';
import { IProduct } from '../product.model';
import * as ProductActions from '../../state/products/product.actions';
import * as CartActions from '../../state/cart/cart.actions';
import { ICart } from 'src/app/carts/cart.model';
import { AuthService } from 'src/app/user/auth.service';
import { getCart } from 'src/app/state/cart/cart.selectors';
import { PState } from 'src/app/state/products/product.state';

// import { ChartType, ChartOptions } from 'chart.js';
// import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  isHovering: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;
  prod!: IProduct;
  products: IProduct[] = [];
  pageTitle: string = "Product List "
  filteredProducts: IProduct[] = [];
  selectedProduct!: IProduct | null;
  filterValue!: string;
  href: string = '';
  username!: string | undefined;
  products$!: Observable<IProduct[]>;
  selectedProduct$!: Observable<any>;
  errorMessage$!: Observable<string>;
  cart!: ICart;
  cart$!: Observable<ICart[]>;
  total!:number;
  qty!: number;
  isAdmin!: boolean | undefined;
  dataReceived = this.productService.getProducts();
  obsProducts$!: Observable<IProduct[]>;
  // temp:string='';
  //Pie chart
  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  // public pieChartLabels: Label[] = ['PHP', '.Net', 'Java'];
  // public pieChartData: SingleDataSet = [50, 30, 20];
  // public pieChartType: ChartType = 'pie';
  // public pieChartLegend = true;
  // public pieChartPlugins = [];



  constructor(private productService: ProductService, private authService: AuthService, private router: Router, private ProductStore: Store<PState>, private CartStore: Store<CState>) {

    // monkeyPatchChartJsTooltip();
    // monkeyPatchChartJsLegend();

  }

  ngOnDestroy(): void {
  }

  @Output() OnProductSelection: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  ngOnInit(): void {
    console.log("in init1");
    this.href = this.router.url;
    this.ProductStore.dispatch(ProductActions.loadProducts());
    this.products$ = this.ProductStore.select(getProducts);
    this.products$.subscribe(data => {
      console.log(data); this.filteredProducts = this.products = data;
    });




    this.isAdmin = this.authService.currentUser?.isAdmin;
    // this.isAdmin = true;
    console.log(this.isAdmin);
    this.username = this.authService.currentUser?.userName





  }
  filterData() {
    console.log(this.filterValue);
    this.filteredProducts = this.products.filter((p) => {
      console.log(p.name + " " + this.filterValue)
      return p.name.toLowerCase().startsWith(this.filterValue.toLowerCase());
    });
  }


  newProduct(): void {
    console.log('in new product');

    // this.productService.changeSelectedProduct(this.productService.newProduct());
    // console.log('back to newProduct from service ');

    this.ProductStore.dispatch(ProductActions.initializeCurrentProduct());
    console.log(this.href + '/manageProduct');
    console.log(window.location.hash);
    // if(window.location.hash=='#main')window.location.hash='';
    this.router.navigate([this.href + '/manageProduct'], { fragment: 'main' });
  }

  productSelected(product: IProduct): void {
    //this.productService.changeSelectedProduct(product);
    this.ProductStore.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

  navigate(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
  getProductById(id: number): IProduct {
    this.productService.getProductById(id).subscribe(resp => this.prod = resp);
    return this.prod;
  }



  // createNewCart(){
  //   this.cart.username=this.username;
  //   this.cart.
  //   this.store.dispatch(CartActions.addCart());
  // }


  add(prod: IProduct) {

    console.log("in add ");
    this.CartStore.dispatch(CartActions.loadCart());
    this.cart$ = this.CartStore.select(getCart);
    this.cart$.subscribe(data => {
      console.log(data); this.cart = data[0];
    });

    console.log(this.cart);
    console.log(prod);

    // this.cart.products.push(prod);


    
    // prod.qty+=1;

    // this.cart={
    //   username:'vamsi',
    //   products:[prod],
    //   count:0,
    //   id
    // }





    this.CartStore.dispatch(CartActions.updateCart({  cart: {...this.cart,products:[...this.cart.products,{...prod,qty:prod.qty+1}] ,totalPrice:this.total }}));

    // this.filteredProducts.forEach((p) => {
    //   // console.log(p);
    //   console.log(prod.id +" "+p.id);
    //   if (p.id == prod.id) {
    //     console.log(p);
    //     p = { ...p, qty: p.qty + 1 };
    //     console.log(p);
    //   }
    // });
    // console.log(this.filteredProducts);
  }

  delete(prod: IProduct) {

    console.log(prod);
  }

  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.products.length;i++){
      this.total += (this.products[i].price * this.products[i].qty);
    }
    console.log("total",this.total);
  }

}
