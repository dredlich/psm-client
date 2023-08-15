import { Injectable } from '@angular/core';
import { Code } from '../../model/code';
import { Use, Product, Items } from '../../model';
import { InitContextService } from './init.context.service';


@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  constructor(private appContext: InitContextService) { }

  public convertToProductArray(mittelArray: any[]): Product[] {
    const resultList: Array<Product> = [];
    mittelArray.forEach(item => {
      const formulationCode = this.appContext.codeDict[
        this.appContext.FORMULATION_TYPE_CODELIST_ID
      ].find(x => x.kode === item.formulierung_art);
      const product = new Product(
        item.kennr,
        item.mittelname,
        formulationCode.kodetext,
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
      // wirkungsbereich | fieldOfUse
      const fieldOfUseCode = this.appContext.codeDict[
        this.appContext.FIELD_OF_USE_CODELIST_ID
      ].find(x => x.kode === item.wirkungsbereich);
      // einsatzgebiet | applicationArea
      const applicationAreaCode = this.appContext.codeDict[
        this.appContext.APPLICATION_AREA_CODELIST_ID
      ].find(x => x.kode === item.einsatzgebiet);
      // anwendungsbereich | areaOfUse
      const areaOfUseCode = this.appContext.codeDict[
        this.appContext.AREA_OF_USE_CODELIST_ID
      ].find(x => x.kode === item.anwendungsbereich);
      // anwendungstechnik | applicationTechnic
      const applicationTechnicCode = this.appContext.codeDict[
        this.appContext.APPLICATION_TECHNIC_CODELIST_ID
      ].find(x => x.kode === item.anwendungstechnik);

      const use = new Use(
        item.awg_id,
        item.kennr,
        item.antragnr,
        item.awgnr,
        fieldOfUseCode.kodetext,
        applicationAreaCode.kodetext,
        areaOfUseCode.kodetext,
        applicationTechnicCode.kodetext
      );
      resultList.push(use);
    });
    return resultList;
  }

  public convertToCodeArray(list: Items): Array<Code> {
    const resultList: Array<Code> = [];
    list.items.forEach(item => {
      const code =  new Code(item.kode, item.kodeliste, item.sprache, item.kodetext, item.sperre);
      resultList.push(code);
    });
    return resultList;
  }
}
