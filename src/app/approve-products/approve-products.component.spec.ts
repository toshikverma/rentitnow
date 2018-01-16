import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProductsComponent } from './approve-products.component';

describe('ApproveProductsComponent', () => {
  let component: ApproveProductsComponent;
  let fixture: ComponentFixture<ApproveProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
