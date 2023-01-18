import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {Observable, tap,Subscription } from 'rxjs';

import { ProductService } from 'src/app/shared/product.service';
import { getCurrentProduct } from 'src/app/state/products/product.selectors';
import { PState } from 'src/app/state/products/product.state';
import { Category, IProduct } from '../product.model';
import * as ProductActions from '../../state/products/product.actions'
import { GenericValidator } from 'src/app/shared/genericvalidator';



@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit, OnDestroy {

  pageTitle = 'Add Product';
  errorMessage = '';
  addProduct!: FormGroup;
  product!: IProduct | null | undefined;
  sub!: Subscription;
  displayMessage: { [key: string]: string } = {};
  product$!: Observable<IProduct | null | undefined>;

  private validationMessages!: { [key: string]: { [key: string]: string } };

  private genericValidator!: GenericValidator;

  constructor(private ProductStore: Store<PState>, private formBuilder: FormBuilder, private router: Router, private productService: ProductService) {

    this.validationMessages = {

      name: {
        required: 'Product name is required ',
        minLength: 'Product name must have 3 characters',
        maxLength: 'Product name must have less than  equal to 10 chars'
      },
      category: {
        required: 'Category is required'
      },
      code: {
        required: 'Item Code is required'
      },
      price: {
        required: 'Price is required'
      }, image: {
        required: 'Image is required'
      }, desc: {
        required: 'Description is required'
      },
      discount: {
        required: ' Discount is required'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnDestroy(): void {
    //   this.sub.unsubscribe();
  }


  ngOnInit() {
    console.log('in init of product add ,creating form');

    // window.location.hash = 'main';


    this.addProduct = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      price: [, [Validators.required]],
      category: [, [Validators.required]],
      image: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      discount: [,[Validators.required]]

    });

    console.log('created add form ')

    // Watch for changes to the currently selected product
    this.product$ = this.ProductStore.select(getCurrentProduct)
      .pipe(
        tap(currentProduct => this.displayProduct(currentProduct))
      );

    this.product$.subscribe(resp => this.product = resp);

    console.log('selected current product in ng onit add product ', this.product);

    // Watch for value changes for validation
    this.addProduct.valueChanges.subscribe(
      () => this.displayMessage =
        this.genericValidator.processMessages(this.addProduct)
    );

    console.log('value in form changes')

    //when the product is selected from the product list , it should be displayed on the form

    //this.sub=this.productService.selectedProductChanges$.subscribe(selProd=>this.displayProduct(selProd));


    this.addProduct.valueChanges.
      subscribe(() => this.displayMessage = this.genericValidator.processMessages(this.addProduct));
  }


  get id() {
    return this.addProduct.get("id");
  }

  get name() {
    return this.addProduct.get("name");
  }

  get code() {
    return this.addProduct.get("code");
  }

  get image() {
    return this.addProduct.get("image");
  }
  get price() {
    return this.addProduct.get("price");
  }
  get category() {
    return this.addProduct.get("category");
  }

  get discount() {
    return this.addProduct.get("discount");
  }

  get desc() {
    return this.addProduct.get("desc");
  }
  

 
  //method which renders the selected product on the form
  displayProduct(productParam: IProduct | null | undefined): void {
    
    this.product = productParam;
    console.log(this.product, 'in display product of product add component ');
    if (this.product) {
      //reset the form to its original
      this.addProduct.reset();

      if (this.product.id == 0) {
        this.pageTitle = 'Add Product';
      }
      else {

        this.pageTitle = `Edit Product: ${this.product.name}`;

      }
      //update the data on the form
      this.addProduct.patchValue({
        id: this.product.id,
        name: this.product.name,
        code:this.product.code,
        image: this.product.image,
        price: this.product.price,
        category: this.product.category,
        desc:this.product.desc,
        discount:this.product.discount

      })


    }

  }

  saveProduct(originalProduct: IProduct | null | undefined): void {

    if (this.addProduct.valid) {
      if (this.addProduct.dirty) {
        //copy over all of the orginal product properties
        //we arecopying data from teh addform
        //{...} it ensures that values are not lost ids are retained
        const product = { ...originalProduct, ...this.addProduct.value };
        console.log(product, 'saveProduct of product add');
        if (product.id == 0) {

          this.ProductStore.dispatch(ProductActions.createProduct({ product }));
       

        }
        else {
          console.log(product);
          this.ProductStore.dispatch(ProductActions.updateProduct({ product }));


     
        }
      }
      window.location.hash='';
      // this.router.navigate(['products/addProduct'])
    }

  }
  //validating on blur ,if user tabs out through the form fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.addProduct);

  }

  deleteProduct(prod: IProduct | null | undefined): void {
    if (prod && prod.id) {

      if (confirm(`Are you sure you want to delete ${prod.name} details`)) {


        this.ProductStore.dispatch(ProductActions.deleteProduct({ productId: prod.id }));

        // this.productService.deleteProduct(prod.id).subscribe(
        //   resp=>this.productService.changeSelectedProduct(null),
        //   err=>this.errorMessage=err
        // );
      }
      else {
        // No need to delete, it was never saved
        this.ProductStore.dispatch(ProductActions.clearCurrentProduct());

        // this.productService.changeSelectedProduct(null)
      }
    }

  }
}
