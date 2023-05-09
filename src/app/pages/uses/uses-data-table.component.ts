import { Component, OnInit } from '@angular/core';
import { PsmApiServiceClient } from '../../service/psm.api.service';
import { Use } from '../../model';
import { Observable } from 'rxjs';
import { ConverterService } from '../../service/converter.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-uses',
  templateUrl: './uses-data-table.component.html',
  styleUrls: ['./uses-data-table.component.css']
})
export class UsesDataTableComponent implements OnInit {
  uses: Observable<Use[]>;
  pageIndex = 0;
  pageSize = 5;
  pageSizeSelectCtrlValue = this.pageSize.toString();
  hasNext = false;
  hasPrev = false;
  isLoading = false;
  constructor(
    private converter: ConverterService,
    private psmApiClient: PsmApiServiceClient
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.uses = this.psmApiClient.getUseArray(this.pageIndex, this.pageSize).pipe(
      map((response: any) => {
        if (response.links) {
          this.hasNext = null != response.links.find(x => x.rel === 'next');
          this.hasPrev = null != response.links.find(x => x.rel === 'prev');
        }
        return this.converter.convertToUseArray(response.items);
      }),
      tap(res => {
        console.log(res);
        this.isLoading = false;
      })
    );
  }

  changePageSize(): void {
    this.pageSize = parseInt(this.pageSizeSelectCtrlValue, undefined);
    this.loadData();
  }
  nextPage(): void {
    this.pageIndex++;
    this.loadData();
  }
  prevPage(): void {
    if (this.pageIndex) {
      this.pageIndex--;
      this.loadData();
    }
  }
}
