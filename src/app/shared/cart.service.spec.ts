import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from "rxjs";
import { ICart } from '../carts/cart.model';
import { Category } from '../products/product.model';
import { CartService } from './cart.service';

describe('Cart Service', () => {
    let cartService: CartService;
    let injector: TestBed;

    let httpMock: HttpTestingController;

    let cart: ICart[] = [];
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule,
                FormsModule],
            providers: [CartService]
        });
        cartService = TestBed.get(CartService)
        injector = getTestBed();
        cart = [{


            "id": 0,
            "products": [

                {
                    "id": 1,
                    "name": "Carrot",
                    "code": "CO11",
                    "price": 500,
                    "image": "../../assets/images/carrot.png",
                    "category": Category.vegetables,
                    "desc": "Rich source of dietary carotenoids.",
                    "discount": 40,
                    "qty": 2
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
                    "qty": 3
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
                    "qty": 1
                },
                {
                    "id": 4,
                    "name": "Brinjal",
                    "code": "BD13",
                    "price": 550,
                    "image": "../../assets/images/bringal",
                    "category": Category.vegetables,
                    "desc": "Helps to lower the risk of many heart diseases.",
                    "discount": 40,
                    "qty": 1
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
                    "qty": 1
                },
            ]
            , "totalPrice": 2000
        }]


        httpMock = injector.get(HttpTestingController);
    });


    it('should create', () => {
        expect(cartService).toBeTruthy();
    });

      // Here we are testing the getCart() of CartService by mocking the http get request
    //This testcase will be passed when the cart data received from cartservice is equal to
    // the cart data declared above in this file.
    it('should getCart()', inject([HttpTestingController, CartService],
        (httpMock: HttpTestingController, service: CartService) => {
            service.getCart().subscribe(resp => expect(cart).toEqual(resp));
            const mockReq = httpMock.expectOne(service.url);
            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.responseType).toEqual('json');
            mockReq.flush(cart);
            httpMock.verify();
        }
    ));


    /// Here we are testing the updateCart() of CartService by mocking the http put request
    //This testcase will be passed when the updated Cart data received from cartservice is equal 
    //to the updated cart that we have passed
    it('updateCart () should update cart', () => {

        const newProduct = {
            "id": 25,
            "name": "Eggs",
            "code": "EG32",
            "price": 100,
            "image": "../../assets/images/eggs.jpg",
            "category": Category.dairy,
            "desc": "Good in proteins and amino acids.",
            "discount": 40,
            "qty": 0

        };
        const updatedCart = { ...cart[0], products: [...cart[0].products, newProduct] };
        cartService.updateCart(updatedCart).subscribe(resp => expect(resp).toEqual(updatedCart))
        const req = httpMock.expectOne(`${cartService.url}/${cart[0].id}`);
        expect(req.request.method).toBe('PUT');
        req.flush(cart);
        httpMock.verify();
    });




});