import { Column } from './table/column';

export interface IProduct {
  productNr: string;
  name: string;
  formulationType: string;
  authorizationStart: string;
  authorizationEnd: string;
}
export class Product implements IProduct {
  @Column({
    orderInfo: 1,
    isSortable: true,
  })
  productNr: string;
  @Column({
    orderInfo: 2,
    isSortable: true,
  })
  name: string;
  @Column({
    orderInfo: 3,
    isSortable: true,
  })
  formulationType: string;
  @Column({
    orderInfo: 4,
    isSortable: true,
  })
  authorizationStart: string;
  @Column({
    orderInfo: 5,
    isSortable: true,
  })
  authorizationEnd: string;

  constructor(productNr, name, formulationType, authorizationStart, authorizationEnd) {
    this.productNr = productNr;
    this.name = name;
    this.formulationType = formulationType;
    this.authorizationStart = authorizationStart;
    this.authorizationEnd = authorizationEnd;
  }
}
