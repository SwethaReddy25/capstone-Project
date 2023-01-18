import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers:[FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input field with class username & type text.', () => {
    const el = fixture.debugElement.query(By.css('.username'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('placeholder')).toEqual('Username');
  });

  
  it('should have an input field with class & type password.', () => {

    const el = fixture.debugElement.query(By.css('.password'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('password');
    let ctrl = component.loginForm.get('password');
    ctrl?.setValue('password11')
    fixture.detectChanges();
    expect(el.nativeElement.value).toEqual('password11');

  });


 

});
