import { Injectable } from "@angular/core";
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { ICart } from "../carts/cart.model";
import { Category, IProduct } from "../products/product.model";
@Injectable({ providedIn: 'root' })
export class InMemoryAppDbService implements InMemoryDbService {
  createDb() {
    const products: IProduct[] = [{
      "id": 1,
      "name": "Carrot",
      "code": "CO11",
      "price": 500,
      "image": "../../assets/images/carrot.png",
      "category": Category.vegetables,
      "desc": "Rich source of dietary carotenoids.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 2,
      "name": "Spinach",
      "code": "QW712",
      "price": 600,
      "image": "../../assets/images/spinach.jpg",
      "category": Category.vegetables,
      "desc": "Strengthens the immune System.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 3,
      "name": "Tomato",
      "code": "CD12",
      "price": 350,
      "image": "../../assets/images/tamoto.jpg",
      "category": Category.vegetables,
      "desc": "Tomates are a good source of several vitamins and mincerals.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 4,
      "name": "Brinjal",
      "code": "BD13",
      "price": 550,
      "image": "../../assets/images/bringal.jpg",
      "category": Category.vegetables,
      "desc": "Helps to lower the risk of many heart diseases.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 5,
      "name": "Beetroot",
      "code": "BT14",
      "price": 350,
      "image": "../../assets/images/beetroot.jpg",
      "category": Category.vegetables,
      "desc": "Could help keep your blood pressure in check.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 6,
      "name": "Bittergourd",
      "code": "GC009",
      "price": 250,
      "image": "../../assets/images/bittergaurd.jpg",
      "category": Category.vegetables,
      "desc": "Reduces several blood-sugar control markers.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 7,
      "name": "capsicum",
      "code": "CP09",
      "price": 380,
      "image": "../../assets/images/Capsicum.jpg",
      "category": Category.vegetables,
      "desc": "Very high in Vitamin C.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 8,
      "name": "Whole wheat flour",
      "code": "WF909",
      "price": 470,
      "image": "../../assets/images/whole wheat.jpg",
      "category": Category.grains,
      "desc": "Reduce your risk of obesity.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 9,
      "name": "Finger millet",
      "code": "AD098",
      "price": 135,
      "image": "../../assets/images/Finger millet.jpg",
      "category": Category.grains,
      "desc": "Helps to control the bad cholesterol.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 10,
      "name": "All purpose flour",
      "code": "BGV55",
      "price": 299,
      "image": "../../assets/images/All purpose flour.jpg",
      "category": Category.grains,
      "desc": "Hight in carbohydrates.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 11,
      "name": "Rice",
      "code": "QZ54",
      "price": 760,
      "image": "../../assets/images/rice.jpg",
      "category": Category.grains,
      "desc": "Rich source of carbohydrates.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 12,
      "name": "Corn",
      "code": "JK76",
      "price": 390,
      "image": "../../assets/images/corn.jpg",
      "category": Category.grains,
      "desc": "Corn is rich in vitamin C, an antioxidant.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 13,
      "name": "Barley",
      "code": "BNJ95",
      "price": 530,
      "image": "../../assets/images/barley.jpg",
      "category": Category.grains,
      "desc": "Reduces hunger and may help you lose weight.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 14,
      "name": "Apple",
      "code": "Ap10",
      "price": 600,
      "image": "../../assets/images/apple.jpeg",
      "category": Category.grains,
      "desc": "A apple a day keeps doctor away.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 15,
      "name": "Orange",
      "code": "VX879",
      "price": 200,
      "image": "../../assets/images/orange.jpg",
      "category": Category.fruits,
      "desc": "Helps fight cancer.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 16,
      "name": "Mango",
      "code": "GR567",
      "price": 800,
      "image": "../../assets/images/mango.jpg",
      "category": Category.fruits,
      "desc": "Boots immunity and brain health.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 17,
      "name": "Grapes",
      "code": "JBV23",
      "price": 500,
      "image": "../../assets/images/grapees.jpg",
      "category": Category.fruits,
      "desc": "Promotes skin and hair health.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 18,
      "name": "Avocado",
      "code": "PA345",
      "price": 1399,
      "image": "../../assets/images/avocado.jpg",
      "category": Category.fruits,
      "desc": "Good spurce of potassium.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 19,
      "name": "Strawberry",
      "code": "VX879",
      "price": 900,
      "image": "../../assets/images/strawberry.jpg",
      "category": Category.fruits,
      "desc": "Reduces inflammation.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 20,
      "name": "Milk",
      "code": "ML4321",
      "price": 300,
      "image": "../../assets/images/milk.jpg",
      "category": Category.dairy,
      "desc": "It makes teeth and bones stronger.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 21,
      "name": "Butter",
      "code": "BU921",
      "price": 400,
      "image": "../../assets/images/butter.jpg",
      "category": Category.dairy,
      "desc": "It makes teeth and bones stronger.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 22,
      "name": "Ghee",
      "code": "GH980",
      "price": 380,
      "image": "../../assets/images/ghee.jpg",
      "category": Category.dairy,
      "desc": "Butter contains vitamin D.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 23,
      "name": "Panner",
      "code": "PA908",
      "price": 600,
      "image": "../../assets/images/panner.jpg",
      "category": Category.dairy,
      "desc": "Building a strong immune system.",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 24,
      "name": "Cheese",
      "code": "CH76",
      "price": 800,
      "image": "../../assets/images/cheese.jpg",
      "category": Category.dairy,
      "desc": "Great source of protein and calcium",
      "discount": 40,
      "qty": 0
    },
    {
      "id": 25,
      "name": "Eggs",
      "code": "EG32",
      "price": 100,
      "image": "../../assets/images/eggs.jpg",
      "category": Category.dairy,
      "desc": "Good in proteins and amino acids.",
      "discount": 40,
      "qty": 0

    },
    ];

    const cart: ICart[] = [{


      "id": 0,
      "products": [

        // {
        //   "id": 1,
        //   "name": "Carrot",
        //   "code": "CO11",
        //   "price": 500,
        //   "image": "../../assets/images/carrot.png",
        //   "category": Category.vegetables,
        //   "desc": "Rich source of dietary carotenoids.",
        //   "discount": 40,
        //   "qty": 0
        // },
        // {
        //   "id": 2,
        //   "name": "Spinach",
        //   "code": "QW712",
        //   "price": 600,
        //   "image": "../../assets/images/spinach.jpg",
        //   "category": Category.vegetables,
        //   "desc": "Strengthens the immune System.",
        //   "discount": 40,
        //   "qty": 0
        // },
        // {
        //   "id": 3,
        //   "name": "Tomato",
        //   "code": "CD12",
        //   "price": 350,
        //   "image": "../../assets/images/tamoto.jpg",
        //   "category": Category.vegetables,
        //   "desc": "Tomates are a good source of several vitamins and mincerals.",
        //   "discount": 40,
        //   "qty": 0
        // },
        // {
        //   "id": 4,
        //   "name": "Brinjal",
        //   "code": "BD13",
        //   "price": 550,
        //   "image": "../../assets/images/bringal",
        //   "category": Category.vegetables,
        //   "desc": "Helps to lower the risk of many heart diseases.",
        //   "discount": 40,
        //   "qty": 0
        // },
        // {
        //   "id": 5,
        //   "name": "Beetroot",
        //   "code": "BT14",
        //   "price": 350,
        //   "image": "../../assets/images/beetroot.jpg",
        //   "category": Category.vegetables,
        //   "desc": "Could help keep your blood pressure in check.",
        //   "discount": 40,
        //   "qty": 0
        // },
      ]
      ,totalPrice:0
    }
  ]
    
    return { products, cart };
  }
}
