import { TestBed, inject } from '@angular/core/testing';

import { ReasonsService } from './reasons.service';

describe('ReasonsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReasonsService]
    });
  });

  it('should be created', inject([ReasonsService], (service: ReasonsService) => {
    expect(service).toBeTruthy();
  }));
});
