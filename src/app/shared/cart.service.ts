import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { ICart } from "../carts/cart.model";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    //CartService --constructor -- it says CartService has  a dependency of type HttpClient

    public url = "api/cart";
    cart !: ICart;
    constructor(private http: HttpClient) { }


    // This function is used to fetch the cart details from inmemorydb by making http get request
    getCart(): Observable<ICart[]> {
        return this.http.get<ICart[]>(`${this.url}`).pipe(
            tap(data => {
                console.log(data);
            }),
            catchError(this.errorHandler)
        );
    }

// This function is used to make any changes in the cart like adding a product ,increasing or decreasing
// quantity ,removing a product from the cart  by making http put request
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

// This is used to handle the errors
    errorHandler = (err: any) => {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error has occured ${err.error.message}`
        }
        else {
            errorMessage = `Backend error code ${err.status} ${err.body.error}`;
        }
        console.log(err, errorMessage);
        return throwError(errorMessage);
    }
}