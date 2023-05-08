import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {Code} from '../../model/code';
import {Router} from '@angular/router';
import {PsmApiServiceClient} from '../../service/psm.api.service';
import {IUse, Use} from '../../model/use';

@Component({
  selector: 'app-uses',
  templateUrl: './uses-data-table.component.html',
  styleUrls: ['./uses-data-table.component.css']
})
export class UsesDataTableComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading = true;
  dataSource = new MatTableDataSource<Use>();
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
  displayedColumns: string[] = [
    'productNr',
    'authorizationRequestNr',
    'useNr',
    'einsatzgebiet',
    'anwendungsbereich',
    'anwendungstechnik',
    'wirkungsbereich'
  ];
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
  convertToUseList(items: any[]): Use[] {
    const resultList: Use[] = [];
    items.forEach(item => {
      // const code = this.codeList.find(x => x.code === item.formulierung_art);
      const use = new Use(
        item.awgId,
        item.kennr,
        item.antragnr,
        item.awgnr,
        item.einsatzgebiet,
        item.anwendungsbereich,
        item.anwendungstechnik,
        item.wirkungsbereich
      );
      resultList.push(use);
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
    this.psmServiceClient.getUseListViaPage(pageEvent.pageIndex, pageEvent.pageSize).subscribe({
      next: (page): void => {

        self.pageSize = page.limit;
        self.pageNumber = (page.offset / page.limit) - 1;

        self.dataSource.data = this.convertToUseList(page.items);
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

  sortUses(sort: Sort): void {
    const isAsc = null != sort.direction && sort.direction === 'asc';
    const prop: keyof IUse = sort.active as keyof IUse;
    this.dataSource.data.sort((a: Use, b: Use) => {
      return isAsc
        ? this.collator.compare(a[prop], b[prop])
        : this.collator.compare(b[prop], a[prop]);
    });
  }
}
