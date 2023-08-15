import { ColumnModel } from './column.model';
export class TableModel {

  columns: ColumnModel[] = [];
  addColumn(column: ColumnModel): void {
    this.columns = [...this.columns, column];
  }
}
