import { ColumnModel } from './column.model';
import { TableModel } from './table.model';
import 'reflect-metadata';

export const tableSymbol = Symbol('column');

export function Column(options: Partial<ColumnModel> = {}): any {
  return (target: any, propertyKey: string) => {
    if (!target[tableSymbol]) {
      target[tableSymbol] = new TableModel();
    }
    options.columnName = options.columnName || propertyKey;
    const propType = Reflect.getMetadata('design:type', target, propertyKey);
    options.valueType = propType.name;
    const columnOptions = new ColumnModel(options);
    target[tableSymbol].addColumn(columnOptions);
  };
}
