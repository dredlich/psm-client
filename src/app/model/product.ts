export interface IProduct {
  productNr: string;
  name: string;
  formulationType: string;
  authorizationStart: string;
  authorizationEnd: string;
}
export class Product implements IProduct {
  productNr: string;
  name: string;
  formulationType: string;
  authorizationStart: string;
  authorizationEnd: string;

  constructor(productNr, name, formulationType, authorizationStart, authorizationEnd) {
    this.productNr = productNr;
    this.name = name;
    this.formulationType = formulationType;
    this.authorizationStart = authorizationStart;
    this.authorizationEnd = authorizationEnd;
  }
}
