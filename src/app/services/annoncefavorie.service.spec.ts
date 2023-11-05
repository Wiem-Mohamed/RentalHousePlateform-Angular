import { TestBed } from '@angular/core/testing';

import { AnnoncefavorieService } from './annoncefavorie.service';

describe('AnnoncefavorieService', () => {
  let service: AnnoncefavorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnoncefavorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
