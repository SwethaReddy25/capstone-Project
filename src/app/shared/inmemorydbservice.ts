import { Injectable } from "@angular/core";
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class DBServie implements InMemoryDbService {
    createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
        throw new Error("Method not implemented.");
    }
}
let vegetables=[
    {
      "Product id":1,
      "Product Name":"Carrot",
      "Product Code":"CO11",
      "Product Price":"Rs.500",
      "image":"../../assets/images/carrot.png", 
      "Product Category":"Vegetable", 
      "Product Description":"Rich source of dietary carotenoids.", 
    },
    {
      "Product id":2,
      "Product Name":"Spinach",
      "Product Code":"QW712",
      "Product Price":"Rs.600",
      "image":"../../assets/images/spinach.jpg", 
      "Product Category":"Vegetable", 
      "Product Description":"Strengthens the immune System.",
  
    },
    {
      "Product id":3,
      "Product Name":"Tamoto",
      "Product Code":"CD12",
      "Product Price":"Rs.350",
      "image":"../../assets/images/tamoto.jpg", 
      "Product Category":"Vegetable", 
      "Product Description":"Tomates are a good source of several vitamins and mincerals.",

    },
    {
      "Product id":4,
      "Product Name":"Bringal",
      "Product Code":"BD13",
      "Product Price":"Rs.550",
      "image":"../../assets/images/bringal", 
      "Product Category":"Vegetable", 
      "Product Description":"Helps to lower the risk of many heart diseases.",
    },
    {
        "Product id":5,
      "Product Name":"Beetroot",
      "Product Code":"BT14",
      "Product Price":"Rs.350",
      "image":"../../assets/images/beetroot.jpg", 
      "Product Category":"Vegetable", 
      "Product Description":"Could help keep your blood pressure in check.",
    },
    {
      "Product id":6,
      "Product Name":"Bittergaurd",
      "Product Code":"GC009",
      "Product Price":"Rs.250",
      "image":"../../assets/images/bittergaurd.jpg", 
      "Product Category":"Vegetable", 
      "Product Description":"Reduces several blood-sugar control markers.",
    },
    {
      "Product id":7,
      "Product Name":"capsicum",
      "Product Code":"CP09",
      "Product Price":"Rs.380",
      "image":"../../assets/images/Capsicum.jpg", 
      "Product Category":"Vegetable", 
      "Product Description":"Very high in Vitamin C.",
    },
  
]