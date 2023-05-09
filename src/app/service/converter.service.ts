import { Injectable } from '@angular/core';
import { PsmApiServiceClient } from './psm.api.service';
import { Code } from '../model/code';
import { Use, Product } from '../model';


@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  constructor(private psmServiceClient: PsmApiServiceClient) {
    this.psmServiceClient = psmServiceClient;
  }

  public convertToProductArray(mittelArray: any[], codeList: Code[]): Product[] {
    const resultList: Array<Product> = [];
    mittelArray.forEach(item => {
      const code = codeList.find(x => x.code === item.formulierung_art);
      const product = new Product(
        item.kennr,
        item.mittelname,
        // item.formulierung_art,
        code.codeValueText,
        item.zul_erstmalig_am,
        item.zul_ende
      );
      resultList.push(product);
    });
    return resultList;
  }

  public convertToUseArray(items: any[]): Use[] {
    const resultList: Use[] = [];
    items.forEach(item => {
      const use = new Use(
        item.awg_id,
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

  public convertToCodeArray(items: any): Array<Code> {
    const resultList: Array<Code> = [];
    items.forEach(item => {
      const code =  new Code(item.kode, item.kodeliste, item.sprache, item.kodetext, item.sperre);
      resultList.push(code);
    });
    return resultList;
  }
}
