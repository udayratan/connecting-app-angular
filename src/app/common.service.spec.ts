import { TestBed, inject } from '@angular/core/testing';

import { CommonServices } from './common.service';

describe('CommonServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonServices]
    });
  });

  it('should be created', inject([CommonServices], (service: CommonServices) => {
    expect(service).toBeTruthy();
  }));
});
