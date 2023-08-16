import { Component, Input, OnInit, Output } from '@angular/core';
import { ColumnModel } from '../../../model/table/column.model';
import { Sort, SortDirection } from '@angular/material/sort';
import { sortBy, orderBy } from 'lodash';
import { EventEmitter } from '@angular/core';
import { TableParamModel } from '../../../model/table/table.param.model';

@Component({
  selector: 'psm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() selectedEndpoint: string;
  private loadedData: any[] = [];

  private tableData = [];
  collator: Intl.Collator = new Intl.Collator(undefined,
    { numeric: true, sensitivity: 'base' }
  );


  @Input() keyMapEndpoint: any;
  @Output('changeSelectedTable') fireSelectedTableChange: EventEmitter<TableParamModel> = new EventEmitter();

  @Input() set data(itemArray: any[]) {
    if (itemArray && itemArray.length > 0) {
      let i = 0;
      this.columns = [];

      for (const columnName of Object.keys(itemArray[0])) {
        if ('m_row$$' === columnName){
          continue;
        }
        const hasData = itemArray.filter(item => null != item[columnName]).length > 0;
        if (hasData){
          this.columns.push({
            columnName,
            orderInfo: i++,
            valueType: typeof itemArray[0][columnName],
            isSortable: true
          });
        }
      }

      this.tableData = [];
      for (const item of itemArray) {
        this.tableData.push(item);
      }
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

  changeSelectedTable(tempModel: any, parameterValue: string): void {
    this.fireSelectedTableChange.emit(new TableParamModel(tempModel.tableName, tempModel.parameterName, parameterValue, tempModel.refType));
  }

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
    this.sortColumns();
    this.displayedColumns = this.columns.map(col => col.columnName);
  }

  private sortColumns(): void {
    this.columns = sortBy(this.columns, ['orderInfo']);
  }
}
