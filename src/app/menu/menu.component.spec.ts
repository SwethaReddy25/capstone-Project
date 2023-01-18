import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material-module/material.module';
import { RouterTestingModule } from '@angular/router/testing';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[StoreModule.forRoot({}),MaterialModule,RouterTestingModule],
      declarations: [ MenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'InstaSmart'`, () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('InstaSmart');
  });

  it('should display navbar', () => {
    const fixture=TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    const compiled=fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-menu')).toBeDefined();
  })

});
