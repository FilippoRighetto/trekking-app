import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaCredenzialiComponent } from './modifica-credenziali.component';

describe('ModificaCredenzialiComponent', () => {
  let component: ModificaCredenzialiComponent;
  let fixture: ComponentFixture<ModificaCredenzialiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaCredenzialiComponent]
    });
    fixture = TestBed.createComponent(ModificaCredenzialiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
