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
      "category":"vegetables", 
      "desc":"Rich source of dietary carotenoids.", 
    },
    {
      "id":2,
      "name":"Spinach",
      "code":"QW712",
      "price":600,
      "image":"../../assets/images/spinach.jpg", 
      "category":"vegetables", 
      "desc":"Strengthens the immune System.",
  
    },
    {
      "id":3,
      "name":"Tamato",
      "code":"CD12",
      "price":350,
      "image":"../../assets/images/tamoto.jpg", 
      "category":"vegetables", 
      "desc":"Tomates are a good source of several vitamins and mincerals.",

    },
    {
      "id":4,
      "name":"Brinjal",
      "code":"BD13",
      "price":550,
      "image":"../../assets/images/bringal", 
      "category":"vegetables", 
      "desc":"Helps to lower the risk of many heart diseases.",
    },
    {
      "id":5,
      "name":"Beetroot",
      "code":"BT14",
      "price":350,
      "image":"../../assets/images/beetroot.jpg", 
      "category":"vegetables", 
      "product desc":"Could help keep your blood pressure in check.",
    },
    {
      "id":6,
      "name":"Bittergourd",
      "code":"GC009",
      "price":250,
      "image":"../../assets/images/bittergaurd.jpg", 
      "category":"vegetables", 
      "product desc":"Reduces several blood-sugar control markers.",
    },
    {
      "id":7,
      "name":"capsicum",
      "code":"CP09",
      "price":380,
      "image":"../../assets/images/Capsicum.jpg", 
      "category":"vegetables", 
      "product desc":"Very high in Vitamin C.",
    },
  
]