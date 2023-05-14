import { Component, OnInit } from '@angular/core';
import { Product } from '../../model';
import { PsmApiServiceClient } from '../../service/psm.api.service';
import { ConverterService } from '../../service/converter.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './product-data-table.component.html',
  styleUrls: ['./product-data-table.component.css']
})
export class ProductDataTableComponent implements OnInit {
  products: Observable<Product[]>;
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
    this.products = this.psmApiClient.getProductArray(this.pageIndex, this.pageSize).pipe(
      map((response: any) => {
        if (response.links) {
          this.hasNext = null != response.links.find(x => x.rel === 'next');
          this.hasPrev = null != response.links.find(x => x.rel === 'prev');
        }
        return this.converter.convertToProductArray(response.items);
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
