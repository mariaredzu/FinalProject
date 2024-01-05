import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeusertableComponent } from './typeusertable.component';

describe('TypeusertableComponent', () => {
  let component: TypeusertableComponent;
  let fixture: ComponentFixture<TypeusertableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeusertableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeusertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
