import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaPrenotaTrekkingComponent } from './visualizza-prenota-trekking.component';

describe('VisualizzaPrenotaTrekkingComponent', () => {
  let component: VisualizzaPrenotaTrekkingComponent;
  let fixture: ComponentFixture<VisualizzaPrenotaTrekkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizzaPrenotaTrekkingComponent]
    });
    fixture = TestBed.createComponent(VisualizzaPrenotaTrekkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
