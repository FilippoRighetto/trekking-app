import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaTrekingPersonaliComponent } from './visualizza-treking-personali.component';

describe('VisualizzaTrekingPersonaliComponent', () => {
  let component: VisualizzaTrekingPersonaliComponent;
  let fixture: ComponentFixture<VisualizzaTrekingPersonaliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizzaTrekingPersonaliComponent]
    });
    fixture = TestBed.createComponent(VisualizzaTrekingPersonaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
