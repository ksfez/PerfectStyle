import { TestBed, inject } from '@angular/core/testing';

import { AccessorieService } from './accessorie.service';

describe('AccessorieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessorieService]
    });
  });

  it('should be created', inject([AccessorieService], (service: AccessorieService) => {
    expect(service).toBeTruthy();
  }));
});
