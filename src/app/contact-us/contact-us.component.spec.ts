import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ContactUsComponent } from './contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have an input field with id firstname.', () => {

    const el = fixture.debugElement.query(By.css('#firstname'));

    expect(el).toBeTruthy();

  });

  it('should have an input field with id firstname of type number.', () => {

    const el = fixture.debugElement.query(By.css('#firstname'));

    expect(el.nativeElement.getAttribute('type')).toEqual('text');

  });



  it('should have an input field with id lastname.', () => {

    const el = fixture.debugElement.query(By.css('#lastname'));

    expect(el).toBeTruthy();

  });

  it('should have an input field with id lastname of type number.', () => {

    const el = fixture.debugElement.query(By.css('#lastname'));

    expect(el.nativeElement.getAttribute('type')).toEqual('text');

  });


  it('should have an input field with id firstname.', () => {

    const el = fixture.debugElement.query(By.css('#email'));

    expect(el).toBeTruthy();

  });


  it('should have an input field with id firstname of type number.', () => {

    const el = fixture.debugElement.query(By.css('#email'));

    expect(el.nativeElement.getAttribute('type')).toEqual('email');

  });
});
