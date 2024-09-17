import { TestBed } from '@angular/core/testing';

import { ChemicalElementsSignalsService } from './chemical-elements-signals.service';

describe('ChemicalElementsSignalsService', () => {
  let service: ChemicalElementsSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChemicalElementsSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
