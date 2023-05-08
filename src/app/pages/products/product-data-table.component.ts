import {Component, OnInit, ViewChild} from '@angular/core';
import {IProduct, Product} from '../../model/product';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {PsmApiServiceClient} from '../../service/psm.api.service';
import {Code} from '../../model/code';

@Component({
  selector: 'app-products',
  templateUrl: './product-data-table.component.html',
  styleUrls: ['./product-data-table.component.css']
})
export class ProductDataTableComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading = true;
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['productNr', 'name', 'formulationType', 'authorizationStart', 'authorizationEnd'];
  codeList: Array<Code> = [];

  collator: Intl.Collator = new Intl.Collator(undefined,
    { numeric: true, sensitivity: 'base' }
  );

  // paging
  pageEvent: PageEvent;
  pageNumber: number;
  pageSize: number;
  selected = '10';
  hasNext = false;
  hasPrev = false;
  constructor(private route: Router,
              private psmServiceClient: PsmApiServiceClient) {
    this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = 0;

    this.pageEvent.pageSize =  parseInt(this.selected, undefined);
    this.pageEvent.length = 0;
  }

  ngOnInit(): void {
    this.psmServiceClient.getCodeViaCodeListId(22).subscribe({
      next: (data) => {
        data.items.forEach(item => {
          const code: Code = new Code(item.kode, item.kodeliste, item.sprache, item.kodetext, item.sperre);
          this.codeList.push(code);
        });
        this.loadData(this.pageEvent);
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  convertToProductList(items: any[]): Product[] {
    const resultList: Product[] = [];
    items.forEach(item => {
      const code = this.codeList.find(x => x.code === item.formulierung_art);
      const product = new Product(item.kennr, item.mittelname, code.codeValueText, item.zul_erstmalig_am, item.zul_ende, );
      resultList.push(product);
    });
    return resultList;
  }

  changePageSize(): void {
    this.pageEvent.pageSize = parseInt(this.selected, undefined);
    this.loadData(this.pageEvent);
  }
  nextPage(): void {
    this.pageEvent.pageIndex++;
    this.loadData(this.pageEvent);
  }
  prevPage(): void {
    if (0 !== this.pageEvent.pageIndex) {
      this.pageEvent.pageIndex--;
      this.loadData(this.pageEvent);
    }
  }

  loadData(pageEvent: PageEvent): void {
    const self = this;
    this.psmServiceClient.getProductViaPage(pageEvent.pageIndex, pageEvent.pageSize).subscribe({
      next: (page): void => {

        self.pageSize = page.limit;
        self.pageNumber = (page.offset / page.limit) - 1;

        self.dataSource.data = this.convertToProductList(page.items);
        self.dataSource.sort = this.sort;

        if (page.links) {
          this.hasNext = null != page.links.find(x => x.rel === 'next');
          this.hasPrev = null != page.links.find(x => x.rel === 'prev');
        }

        self.isLoading = false;
      },
      error: (error: any): void => {
        console.error(error);
        self.isLoading = false;
      }
    });
  }

  sortProducts(sort: Sort): void {
    const isAsc = null != sort.direction && sort.direction === 'asc';
    const prop: keyof IProduct = sort.active as keyof IProduct;
    this.dataSource.data.sort((a: Product, b: Product) => {
      return isAsc
        ? this.collator.compare(a[prop], b[prop])
        : this.collator.compare(b[prop], a[prop]);
    });
  }
}
