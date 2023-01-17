import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { Category, IProduct } from "../products/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //angular DI will resolve the dependency of ProductService class on HttpClient
  //A -- B --C
  //ProductListComponent it has a dependency mentioned in the constructors
  //P roductService --constructor -- it says ProductService has  a dependency of type HttpClient
  foundIndex: number = 0;
  private url = "api/products";
  products: IProduct[] = [];

  private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
  selectedProductChanges$ = this.selectedProductSource.asObservable();


  constructor(private http: HttpClient) { }

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

  newProduct(): IProduct {
    //logic should focus on sending back a IProduct
    return {

      id: 0,
      name: '',
      category: Category.fruits,
      price: 0,
      image: '',
      code: '',
      desc: '',
      discount: 0,
      qty: 0

    };

  }


  getProductById(id: number): Observable<IProduct> {
    return this.getProducts().pipe(
      tap(() => {
        console.log('fetch product' + id);
        this.foundIndex = this.products.findIndex(item => item.id == id);
        //if(this.foundIndex > -1){
        // this.products[this.foundIndex];
        //  }
      }),
      map(() => this.products[this.foundIndex]),
      catchError(this.errorHandler)
    );
  }

  updateProduct(product: IProduct): Observable<IProduct> {


    console.log("in update product ", product);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //put http method
    const url = `${this.url}/${product.id}`;

    //logic to call http put method to update the product on the given url
    return this.http.put<IProduct>(url, product, { headers }).pipe(

      tap((data) => {
        console.log('update product' + product.id);
        console.log(data);
        const foundIndex = this.products.findIndex(item => item.id === product.id);
        // if(foundIndex > -1){
        //   this.products[foundIndex]=product;
        //     }
      }),
      map(() => product),
      catchError(this.errorHandler)
    );






  }



  createProduct(product: IProduct): Observable<IProduct> {
    //headers variable to set request headers
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //const size = this.getProducts.length;
    // const id =size+1;
    //newProduct spread across product
    const newProduct = { ...product, id: null };
    console.log(`in create method  ${this.url}`)

    //return logic starts here
    //http .post method
    //generics method -- IProduct
    //args --3 url , newProduct ,headers
    //this.url -- declared in the class outside the functions
    return this.http.post<IProduct>(this.url, newProduct, { headers })
      .pipe(
        tap(data => {

          console.log('in create new product' + JSON.stringify(data));
          //pushing the new data new Product to the products array
          // this.products.push(data);
          console.log(JSON.stringify(this.products));

        },
          catchError(this.errorHandler)
        )
      )
  }
  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //@DeleteMapping deleteAll delete url/id  /api/products/111
    const url = `${this.url}/${id}`;

    return this.http.delete<IProduct>(url, { headers })
      .pipe(
        tap(data => {
          console.log('deleted prd' + id);
          const foundIndex = this.products.findIndex(item => item.id === id);
          //if product id is not found means index returned will be -1
          //if(foundIndex > -1)
          //this.products.splice(foundIndex,1);


        },
          catchError(this.errorHandler))


      );





  }

  errorHandler = (err: any) => {

    let errorMessage: string;
    //a client side error or network error then ErrorEvent object will be thrown

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