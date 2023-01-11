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
let Product=[
    {
      "id":1,
      "name":"Carrot",
      "code":"CO11",
      "price":500,
      "image":"../../assets/images/carrot.png", 
      "category":"Vegetable", 
      "product desc":"Rich source of dietary carotenoids.", 
    },
    {
      "id":2,
      "name":"Spinach",
      "code":"QW712",
      "price":600,
      "image":"../../assets/images/spinach.jpg", 
      "category":"Vegetable", 
      "product desc":"Strengthens the immune System.",
  
    },
    {
      "id":3,
      "name":"Tamoto",
      "code":"CD12",
      "price":"Rs.350",
      "image":"../../assets/images/tamoto.jpg", 
      "category":"Vegetable", 
      "product desc":"Tomates are a good source of several vitamins and mincerals.",

    },
    {
      "id":4,
      "name":"Bringal",
      "code":"BD13",
      "price":"Rs.550",
      "image":"../../assets/images/bringal", 
      "category":"Vegetable", 
      "product desc":"Helps to lower the risk of many heart diseases.",
    },
    {
      "id":5,
      "name":"Beetroot",
      "code":"BT14",
      "price":"Rs.350",
      "image":"../../assets/images/beetroot.jpg", 
      "category":"Vegetable", 
      "product desc":"Could help keep your blood pressure in check.",
    },
    {
      "id":6,
      "name":"Bittergaurd",
      "code":"GC009",
      "price":"Rs.250",
      "image":"../../assets/images/bittergaurd.jpg", 
      "category":"Vegetable", 
      "product desc":"Reduces several blood-sugar control markers.",
    },
    {
      "id":7,
      "name":"capsicum",
      "code":"CP09",
      "price":"Rs.380",
      "image":"../../assets/images/Capsicum.jpg", 
      "category":"Vegetable", 
      "product desc":"Very high in Vitamin C.",
    },
  
]