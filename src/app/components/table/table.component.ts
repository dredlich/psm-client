import { Component, Input, OnInit } from '@angular/core';
import { tableSymbol } from '../../model/table/column';
import { TableModel } from '../../model/table/table.model';
import { ColumnModel } from '../../model/table/column.model';
import { Sort, SortDirection } from '@angular/material/sort';
import { sortBy, orderBy } from 'lodash';
@Component({
  selector: 'psm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private loadedData: any[] = [];

  private tableData = [];
  private tableModel: TableModel;

  collator: Intl.Collator = new Intl.Collator(undefined,
    { numeric: true, sensitivity: 'base' }
  );

  @Input() set data(itemArray: any[]) {
    if (itemArray && itemArray.length > 0) {
      this.tableData = [];
      for (const item of itemArray) {
        this.tableData.push(item);
      }
      this.tableModel = this.data[0][tableSymbol];
      this.buildColumns();
      if (!this.loadedData.length) {
        // Keep original order of data
        for (const item of this.tableData) {
          this.loadedData.push(item);
        }
      }
    }
  }
  get data(): any[] {
    return this.tableData;
  }
  @Input() instance: any;
  columns: ColumnModel[];
  displayedColumns: string[];

  constructor() {}

  ngOnInit(): void {}

  sortData(sort: Sort): void {
    console.log(this.data);
    const direction: SortDirection = sort.direction;
    this.data = direction
      ? orderBy(this.data, [sort.active], [direction])
      : this.loadedData;
    console.log(this.data);
  }

  private buildColumns(): void {
    this.columns = this.tableModel.columns;
    this.sortColumns();
    this.displayedColumns = this.columns.map(col => col.columnName);
  }

  private sortColumns(): void {
    this.columns = sortBy(this.columns, ['orderInfo']);
  }
}
