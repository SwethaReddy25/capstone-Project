import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from "rxjs";
import { Category, IProduct } from '../products/product.model';
import { ProductService } from './product.service';

describe('Product Service', () => {
    let productService: ProductService;
    let injector: TestBed;

    let httpMock: HttpTestingController;

    let products: IProduct[] = [];
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule,
                FormsModule],
            providers: [ProductService]
        });
        productService = TestBed.get(ProductService)
        injector = getTestBed();
        products = [
            {
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
                "image": "../../assets/images/bringal",
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
            }];

        httpMock = injector.get(HttpTestingController);
    });


    it('should create', () => {
        expect(productService).toBeTruthy();
    });

    // Here we are testing the getProducts() of ProductService by mocking the http get request
    //This testcase will be passed when the products data received from productservice is equal to
    // the products list declared above in this file.
    it('should getProducts()', inject([HttpTestingController, ProductService],
        (httpMock: HttpTestingController, service: ProductService) => {
            service.getProducts().subscribe(resp => expect(products).toEqual(resp));
            const mockReq = httpMock.expectOne(service.url);
            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.responseType).toEqual('json');
            mockReq.flush(products);
            httpMock.verify();
        }
    ));

    
    // Here we are testing the getProductById() of ProductService by mocking the http get request
    //This testcase will be passed when the product data received from productservice is equal to
    // the product whose id we are passing.
    it('should get product by id', () => {
        let response: IProduct;
        let product =
        {
            "id": 1,
            "name": "Carrot",
            "code": "CO11",
            "price": 500,
            "image": "../../assets/images/carrot.png",
            "category": Category.vegetables,
            "desc": "Rich source of dietary carotenoids.",
            "discount": 40,
            "qty": 0
        };

        const fn = spyOn(productService, 'getProductById').and.returnValue(of(product));
        productService.getProductById(1).subscribe(res => { response = res; expect(response).toEqual(product); });
        expect(fn).toHaveBeenCalled();

    });


    // Here we are testing the createProduct() of ProductService by mocking the http post request
    //This testcase will be passed when the created product data received from productservice is equal 
    //to the product that we are trying to create.
    it('createProduct() should post a product & return product as data', () => {
        let product1 = {
            "id": 1,
            "name": "Carrot",
            "code": "CO11",
            "price": 500,
            "image": "../../assets/images/carrot.png",
            "category": Category.vegetables,
            "desc": "Rich source of dietary carotenoids.",
            "discount": 40,
            "qty": 0
        };

        products = [...products, product1];
        productService.createProduct(product1).subscribe(resp => expect(resp).toEqual(product1))
        expect(products.length).toEqual(6);
        const req = httpMock.expectOne(productService.url);
        expect(req.request.method).toBe('POST');
        req.flush(product1);

    });

    
    // Here we are testing the updateProduct() of ProductService by mocking the http put request
    //This testcase will be passed when the updated product data received from productservice is equal 
    //to the product that we are trying to update.
    it('updateProduct () should update a product', () => {
        let product1 = {
            "id": 1,
            "name": "Carrot",
            "code": "CO11",
            "price": 500,
            "image": "../../assets/images/carrot.png",
            "category": Category.vegetables,
            "desc": "Rich source of dietary carotenoids.",
            "discount": 40,
            "qty": 0
        };

        productService.updateProduct(product1).subscribe(resp => expect(resp).toEqual(product1))
        const req = httpMock.expectOne(`${productService.url}/${product1.id}`);
        expect(req.request.method).toBe('PUT');
        req.flush({ product1 });

    })

    
    // Here we are testing the deleteProduct() of ProductService by mocking the http delete request
    //This testcase will be passed when the deleted product data received from productservice is equal 
    //to the product that we are trying to delete.
    it('deleteProduct () should delete a product', () => {
        let product1 = {
            "id": 1,
            "name": "Carrot",
            "code": "CO11",
            "price": 500,
            "image": "../../assets/images/carrot.png",
            "category": Category.vegetables,
            "desc": "Rich source of dietary carotenoids.",
            "discount": 40,
            "qty": 0
        };

        productService.deleteProduct(1).subscribe(res => expect(res).toEqual({ product1 }));
        const req = httpMock.expectOne(`${productService.url}/${product1.id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({ product1 });
    })
});