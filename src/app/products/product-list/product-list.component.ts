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
  total!: number;
  qty!: number;
  isAdmin!: boolean | undefined;
  dataReceived = this.productService.getProducts();
  obsProducts$!: Observable<IProduct[]>;


  constructor(private productService: ProductService, private authService: AuthService, private router: Router, private ProductStore: Store<PState>, private CartStore: Store<CState>) {
  }

  ngOnDestroy(): void {
  }

  @Output() OnProductSelection: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  // This lifecycle function will be called when the product list component is being rendered
  ngOnInit(): void {
    console.log("in init");

    this.href = this.router.url;


    //Here we are fecthing the product data from ngrx product store
    this.ProductStore.dispatch(ProductActions.loadProducts());
    this.products$ = this.ProductStore.select(getProducts);
    this.products$.subscribe(data => {
      console.log(data); this.filteredProducts = this.products = data;
    });

    //Here we are fecthing the cart data from ngrx cart store
    this.CartStore.dispatch(CartActions.loadCart());
    this.cart$ = this.CartStore.select(getCart);
    this.cart$.subscribe(data => {
      console.log(data); this.cart = data[0];
    });


    this.isAdmin = this.authService.currentUser?.isAdmin;
    this.username = this.authService.currentUser?.userName

  }

  // This is used to filter the product list based on name
  filterData() {
    console.log(this.filterValue);
    this.filteredProducts = this.products.filter((p) => {
      console.log(p.name + " " + this.filterValue)
      return p.name.toLowerCase().startsWith(this.filterValue.toLowerCase());
    });
  }

  // This function will be called when admin clicks on add new product and will redirect us to products/manageProduct
  newProduct(): void {
    this.ProductStore.dispatch(ProductActions.initializeCurrentProduct());
    this.router.navigate([this.href + '/manageProduct'], { fragment: 'main' });
  }

  // This will set the product when a particular product is selected
  productSelected(product: IProduct): void {
    this.ProductStore.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

  //This function is used to redirect to a particular block in that same page
  navigate(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

  // This function will be called when we click  on add to cart.
  // The product which is clicked will be added to cart and it will pass the updated cart to perform
  // the updateCart Action.
  add(prod: IProduct) {
    let new_products = [...this.cart.products, { ...prod, qty: prod.qty + 1 }];
    this.totalPrice(new_products);
    this.CartStore.dispatch(CartActions.updateCart({ cart: { ...this.cart, products: new_products, totalPrice: this.total } }));
  }

  // This is used to check whether a particular item is present in that cart
  isItemInCart(id: number) {
    return this.cart.products.find((p) => p.id == id);
  }

  // This is used to get the quantity of a product in the cart
  getItemQty(id: number) {
    let res = this.cart.products.filter(p => p.id == id)
    console.log(res[0].qty);
    return res[0].qty;
  }

  // This function will be called when we click  on increment button.
  // The product which is clicked will be added to cart with increased quantity and it will pass the 
  //updated cart to perform the updateCart Action.
  plus(id: number) {
    let new_products = this.cart.products.map(p => p.id == id ? { ...p, qty: p.qty + 1 } : p);
    this.totalPrice(new_products);
    this.CartStore.dispatch(CartActions.updateCart({ cart: { ...this.cart, products: new_products, totalPrice: this.total } }));
  }

  // This function will be called when we click  on decrement button.
  // The product which is clicked will be added to cart with decreased quantity and it will pass the 
  //updated cart to perform the updateCart Action.
  minus(id: number) {
    let new_products = this.cart.products.map(p => p.id == id && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p);
    this.totalPrice(new_products);
    this.CartStore.dispatch(CartActions.updateCart({ cart: { ...this.cart, products: new_products, totalPrice: this.total } }));
  }

  // This function will be called when we click  on delete button.
  // The product which is clicked will be removed from the cart and it will pass the 
  //updated cart to perform the updateCart Action.
  remove(id: number) {
    let new_products = this.cart.products.filter(p => p.id != id);
    this.totalPrice(new_products);
    this.CartStore.dispatch(CartActions.updateCart({ cart: { ...this.cart, products: new_products, totalPrice: this.total } }));

  }

  //This will calculate the total price of all the products present in the cart.
  totalPrice(productArr: IProduct[]) {
    this.total = 0;
    for (var i = 0; i < productArr.length; i++) {
      this.total += (productArr[i].price * productArr[i].qty);
    }
    console.log("total", this.total);
  }
}
