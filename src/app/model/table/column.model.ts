export class ColumnModel {
  columnName: string;
  orderInfo: number;
  valueType: any;
  isSortable: boolean;
  constructor(options: Partial<ColumnModel> = {}) {
    this.columnName = options.columnName;
    this.orderInfo = options.orderInfo || 0;
    this.valueType = options.valueType;
    this.isSortable = options.isSortable || false;
  }
}
