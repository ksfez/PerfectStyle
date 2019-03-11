import { TestBed, inject } from '@angular/core/testing';

import { CasualService } from './casual.service';

describe('CasualService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasualService]
    });
  });

  it('should be created', inject([CasualService], (service: CasualService) => {
    expect(service).toBeTruthy();
  }));
});
