import { TestBed } from '@angular/core/testing';

import { ProcessPresenterService } from './process-presenter.service';

describe('ProcessPresenterService', () => {
  let service: ProcessPresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessPresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
