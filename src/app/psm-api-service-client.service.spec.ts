import { TestBed } from '@angular/core/testing';
import { PsmApiServiceClientService } from './psm-api-service-client.service';
import {HttpClientModule} from '@angular/common/http';

describe('PsmApiServiceClientService', () => {
  let service: PsmApiServiceClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
    ]
    });
    service = TestBed.inject(PsmApiServiceClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
