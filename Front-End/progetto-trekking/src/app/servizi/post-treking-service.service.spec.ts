import { TestBed } from '@angular/core/testing';

import { PostTrekingServiceService } from './post-treking-service.service';

describe('PostTrekingServiceService', () => {
  let service: PostTrekingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostTrekingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
