import { TestBed } from '@angular/core/testing';
import { PsmApiServiceClient } from './psm.api.service';
import { HttpClientModule } from '@angular/common/http';

describe('PsmApiServiceClientService', () => {
  let service: PsmApiServiceClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
    ]
    });
    service = TestBed.inject(PsmApiServiceClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
