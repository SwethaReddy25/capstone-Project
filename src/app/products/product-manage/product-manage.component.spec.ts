import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductManageComponent } from './product-manage.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';


describe('ProductAddComponent', () => {
  let component: ProductManageComponent;
  let fixture: ComponentFixture<ProductManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        // StoreModule.forFeature({})
      ],
      declarations: [ProductManageComponent],
      providers: [provideMockStore({})],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* --- test case for Product Name --- */

  it('should check Product Name', () => {
    const e1 = fixture.debugElement.query(By.css('#name'));
    expect(e1).toBeTruthy();
  });

  it('should have Product type of text', () => {
    const e1 = fixture.debugElement.query(By.css('#name'));
    expect(e1.nativeElement.getAttribute('type')).toEqual('text');
  });

  it('should have name as Product Name', () => {
    const e1 = fixture.debugElement.query(By.css('#name'));
    expect(e1.nativeElement.getAttribute('name')).toEqual('name');
  });

  it('should check Product Name input value is correct', () => {
    let name = component.addProduct.controls['name'];
    name.setValue('Carrot');
    expect(name.errors).toBeNull();
  });

  // test case for desc

it('should check Product desc', () => {
  const e1 = fixture.debugElement.query(By.css('#desc'));
  expect(e1).toBeTruthy();

});
it('should have Product descc of text', () => {
  const e1 = fixture.debugElement.query(By.css('#desc'));
  expect(e1.nativeElement.getAttribute('type')).toEqual('text');
});

it('should have name as Product Name', () => {
  const e1 = fixture.debugElement.query(By.css('#desc'));
  expect(e1.nativeElement.getAttribute('name')).toEqual('desc');
});
it('should check Product Name input value is correct', () => {
  let name = component.addProduct.controls['desc'];
  name.setValue('Good for health');
  expect(name.errors).toBeNull();
});

// test case for code


it('should check Product code', () => {
  const e1 = fixture.debugElement.query(By.css('#code'));
  expect(e1).toBeTruthy();

});

it('should have Product code of text', () => {
  const e1 = fixture.debugElement.query(By.css('#code'));
  expect(e1.nativeElement.getAttribute('type')).toEqual('text');
});

it('should have name as Product Name', () => {
  const e1 = fixture.debugElement.query(By.css('#code'));
  expect(e1.nativeElement.getAttribute('name')).toEqual('code');
});

it('should check Product Name input value is correct', () => {
  let name = component.addProduct.controls['code'];
  name.setValue('b111');
  expect(name.errors).toBeNull();
});

  /* ---  test case for Vegetable price --- */

  it('should check Product Price', () => {
    const e1 = fixture.debugElement.query(By.css('#price'));
    expect(e1).toBeTruthy();
  });

  it('should have Product Price type of number', () => {
    const e1 = fixture.debugElement.query(By.css('#price'));
    expect(e1.nativeElement.getAttribute('type')).toEqual('number');
  });

  it('should have name as Price', () => {
    const e1 = fixture.debugElement.query(By.css('#price'));
    expect(e1.nativeElement.getAttribute('name')).toEqual('price');
  });

  it('should check Price input value is correct', () => {
    let price = component.addProduct.controls['price'];
    price.setValue('100');
    expect(price.errors).toBeNull();
  });

  /* --- test case for Image --- */

  it('should check Image', () => {
    const e1 = fixture.debugElement.query(By.css('#image'));
    expect(e1).toBeTruthy();
  });

  it('should have Image type of text', () => {
    const e1 = fixture.debugElement.query(By.css('#image'));
    expect(e1.nativeElement.getAttribute('type')).toEqual('text');
  });

  it('should have name as image', () => {
    const e1 = fixture.debugElement.query(By.css('#image'));
    expect(e1.nativeElement.getAttribute('name')).toEqual('image');
  });

  it('should check image input value is correct', () => {
    let image = component.addProduct.controls['image'];
    image.setValue('../../assets/images/tomato.jpg');
    expect(image.errors).toBeNull();
  });

  /*  test --- case for Select dropdown --- */

  it('should check category', () => {
    const e1 = fixture.debugElement.query(By.css('#category')).nativeElement;
    let select = component.addProduct.controls['category'];
    select.setValue('vegetables');
    expect(select.errors).toBeNull();

    fixture.whenStable().then(() => {
      e1.value = e1.options[1].value;
      fixture.detectChanges();
      let val = e1.options[e1.selectedIndex].label;
      expect(val).toEqual('vegetables');
    }
    )
  });


  /* --- test case for Button Disable --- */

  it('should check addProduct button disabled', () => {
    fixture.detectChanges();
    let btn = fixture.debugElement.query(By.css('#save')).nativeElement;
    expect(btn.disabled).toBe(true);
  })


  // it('should check addProduct button enable', () => {
  //   let btn = fixture.debugElement.query(By.css('#save')).nativeElement;
  //   component.addProduct.controls['id'].setValue(1);
  //   component.addProduct.controls['name'].setValue('tomato');
  //   component.addProduct.controls['price'].setValue(350);
  //   component.addProduct.controls['image'].setValue('../../assets/images/tamoto.jpg');
  //   component.addProduct.controls['category'].setValue('vegetables');
  //   component.addProduct.controls['desc'].setValue('good for health');
  //   component.addProduct.controls['code'].setValue('b111');
  //   component.addProduct.controls['discount'].setValue(14);
  //   console.log("errors",component.addProduct.getError);
  //   fixture.detectChanges();
  //   expect(btn.disabled).toBe(false);
  // });


});



