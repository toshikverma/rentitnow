import { TestBed, inject } from '@angular/core/testing';

import { AdminAuthGaurd } from './admin-auth-gaurd.service';

describe('AdminAuthGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGaurd]
    });
  });

  it('should be created', inject([AdminAuthGaurd], (service: AdminAuthGaurd) => {
    expect(service).toBeTruthy();
  }));
});
