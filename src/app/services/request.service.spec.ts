import { TestBed, inject } from '@angular/core/testing';

import { ReqService } from './request.service';

describe('RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReqService]
    });
  });

  it('should be created', inject([ReqService], (service: ReqService) => {
    expect(service).toBeTruthy();
  }));
});
