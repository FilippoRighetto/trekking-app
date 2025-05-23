import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiTrekkingComponent } from './aggiungi-trekking.component';

describe('AggiungiTrekkingComponent', () => {
  let component: AggiungiTrekkingComponent;
  let fixture: ComponentFixture<AggiungiTrekkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggiungiTrekkingComponent]
    });
    fixture = TestBed.createComponent(AggiungiTrekkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
