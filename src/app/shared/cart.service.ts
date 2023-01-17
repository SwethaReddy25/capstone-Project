import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { ICart } from "../carts/cart.model";
import { IProduct } from "../products/product.model";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    //angular DI will resolve the dependency of ProductService class on HttpClient
    //A -- B --C
    //ProductListComponent it has a dependency mentioned in the constructors
    //P roductService --constructor -- it says ProductService has  a dependency of type HttpClient

    private url = "api/cart";
    cart !: ICart;
    carts: ICart[] = [];
    constructor(private http: HttpClient) { }


    // private selectedCartSource = new BehaviorSubject<IProduct | null>(null);
    // selectedCartChanges$ = this.selectedCartSource.asObservable();
  


    addCart(newCart: ICart): Observable<ICart> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<ICart>(this.url, newCart, { headers })
            .pipe(
                tap(data => {
                    console.log('in create new cart' + JSON.stringify(data));
                    console.log(JSON.stringify(this.cart));
                }
                ));
    }

    getCart(): Observable<ICart[]> {

        return this.http.get<ICart[]>(`${this.url}`).pipe(
            tap(data => {
                console.log(data);
            }),
            catchError(this.errorHandler)
        );
    }


    updateCart(updatedCart: ICart): Observable<ICart> {
        console.log(updatedCart);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log(this.url);
        return this.http.put<ICart>(`${"api/cart/0"}`, updatedCart, { headers })
            .pipe(
                tap((data) => { console.log(data) }),
                map(() => updatedCart),
                catchError(this.errorHandler)
            );
    }

    // getCartByUsername(username: string): Observable<void> {
    //     return this.http.get<void>(this.url).pipe(
    //         tap((data) => { console.log(data); })
    //     );
    // }

    //   getProducts():Observable<ICart[]>{

    //     return this.http.get<IProduct[]>(this.url).pipe(
    //         tap(data=>{console.log(data);
    //         this.products=data;
    //     }),
    //         catchError(this.errorHandler)
    //     ); 
    //   }


    errorHandler = (err: any) => {

        let errorMessage: string;
        //a client side error or network error then ErrorEvent object will be thrown

        if (err.error instanceof ErrorEvent) {

            errorMessage = `An error has occured ${err.error.message}`
        }
        else {

            errorMessage = `Backend error code ${err.status} ${err.body.error}`;

        }
        console.log(err,errorMessage);
        return throwError(errorMessage);


    }

}