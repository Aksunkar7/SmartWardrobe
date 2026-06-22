import { TestBed } from '@angular/core/testing';

import { Outfit } from './outfit';

describe('Outfit', () => {
  let service: Outfit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Outfit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
