import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaTrekkingPersonaliComponent } from './modifica-trekking-personali.component';

describe('ModificaTrekkingPersonaliComponent', () => {
  let component: ModificaTrekkingPersonaliComponent;
  let fixture: ComponentFixture<ModificaTrekkingPersonaliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaTrekkingPersonaliComponent]
    });
    fixture = TestBed.createComponent(ModificaTrekkingPersonaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
