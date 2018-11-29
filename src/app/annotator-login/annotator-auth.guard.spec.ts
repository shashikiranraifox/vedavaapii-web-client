import { TestBed, async, inject } from '@angular/core/testing';

import { AnnotatorAuthGuard } from './annotator-auth.guard';

describe('AnnotatorAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnotatorAuthGuard]
    });
  });

  it('should ...', inject([AnnotatorAuthGuard], (guard: AnnotatorAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
