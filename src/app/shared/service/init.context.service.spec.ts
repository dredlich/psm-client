import { TestBed } from '@angular/core/testing';
import { InitContextService } from './init.context.service';

describe('ContextService', () => {
  let service: InitContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
