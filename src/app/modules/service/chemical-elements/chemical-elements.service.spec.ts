import { TestBed } from '@angular/core/testing';

import { ChemicalElementsService } from './chemical-elements.service';

describe('ChemicalElementsService', () => {
  let service: ChemicalElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChemicalElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
