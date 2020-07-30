import { TestBed } from '@angular/core/testing';

import { ToonsService } from './toons.service';

describe('ToonsService', () => {
  let service: ToonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
