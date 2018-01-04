import { TestBed, inject } from '@angular/core/testing';

import { PrimkeService } from './primke.service';

describe('PrimkeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrimkeService]
    });
  });

  it('should be created', inject([PrimkeService], (service: PrimkeService) => {
    expect(service).toBeTruthy();
  }));
});
