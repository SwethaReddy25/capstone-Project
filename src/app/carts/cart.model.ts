import { IProduct } from "../products/product.model";

export interface ICart{
// username:string;
    id:number;
    products:IProduct[];
    totalPrice:number;
    // count:number;

}2