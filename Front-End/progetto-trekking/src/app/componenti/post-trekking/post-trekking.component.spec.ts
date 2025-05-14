import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTrekkingComponent } from './post-trekking.component';

describe('PostTrekkingComponent', () => {
  let component: PostTrekkingComponent;
  let fixture: ComponentFixture<PostTrekkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostTrekkingComponent]
    });
    fixture = TestBed.createComponent(PostTrekkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
