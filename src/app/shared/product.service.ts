import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { Category, IProduct } from "../products/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //ProductService --constructor -- it says ProductService has a dependency of type HttpClient.

  foundIndex: number = 0;
  public url = "api/products";
  products: IProduct[] = [];

  private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
  selectedProductChanges$ = this.selectedProductSource.asObservable();

  constructor(private http: HttpClient) { }

    // This function is used to fetch the product details from inmemorydb by making http get request
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url).pipe(
      tap(data => {
        console.log(data);
        this.products = data;
      }),
      catchError(this.errorHandler)
    );
  }

  changeSelectedProduct(selectedProduct: IProduct | null): void {
    this.selectedProductSource.next(selectedProduct);
  }

  //It will return the new Empty product of type IProduct
  newProduct(): IProduct {
    return {} as IProduct;
  }


  // It will fetch the product based on id from inmemorydb by making the get request
  getProductById(id: number): Observable<IProduct> {
    return this.getProducts().pipe(
      tap(() => {
        console.log('fetch product' + id);
        this.foundIndex = this.products.findIndex(item => item.id == id);

      }),
      map(() => this.products[this.foundIndex]),
      catchError(this.errorHandler)
    );
  }


  // This is used to update any product in- the inmemorydb by making the put request
  updateProduct(product: IProduct): Observable<IProduct> {

    console.log("in update product ", product);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${product.id}`;

    return this.http.put<IProduct>(url, product, { headers }).pipe(

      tap((data) => {
        const foundIndex = this.products.findIndex(item => item.id === product.id);
      }),
      map(() => product),
      catchError(this.errorHandler)
    );
  }

  //This function is used to create a new product in the inmemorydb by making a post request
  createProduct(product: IProduct): Observable<IProduct> {
    //headers variable to set request headers
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const newProduct = { ...product, id: null };
    console.log(`in create method  ${this.url}`)
    return this.http.post<IProduct>(this.url, newProduct, { headers })
      .pipe(
        tap(data => {
        },
          catchError(this.errorHandler)
        )
      )
  }


  //This function is used to delete a product in inmemorydb by making delete request
  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${id}`;
    console.log("in delete product");
    return this.http.delete<IProduct>(url, { headers })
      .pipe(
        tap(() => {
          // console.log('deleted prd' + data.id);
          const foundIndex = this.products.findIndex(item => item.id === id);
        },
          catchError(this.errorHandler))
      );
  }

// This is used to handle the errors
  errorHandler = (err: any) => {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error has occured ${err.error.message}`
    }
    else {
      errorMessage = `Backend error code ${err.status} ${err.body.error}`;
    }
    console.log(err);
    return throwError(errorMessage);
  }

}