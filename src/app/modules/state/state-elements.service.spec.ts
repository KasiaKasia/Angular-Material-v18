import { TestBed } from '@angular/core/testing';

import { StateElementsService } from './state-elements.service';

describe('StateElementsService', () => {
  let service: StateElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
