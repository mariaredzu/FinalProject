import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeuserformComponent } from './typeuserform.component';

describe('TypeuserformComponent', () => {
  let component: TypeuserformComponent;
  let fixture: ComponentFixture<TypeuserformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeuserformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeuserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
