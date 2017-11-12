import { TestBed, inject } from '@angular/core/testing';

import { UniqueIdCheckService } from './unique-id-check.service';

describe('UniqueIdCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniqueIdCheckService]
    });
  });

  it('should ...', inject([UniqueIdCheckService], (service: UniqueIdCheckService) => {
    expect(service).toBeTruthy();
  }));
});
