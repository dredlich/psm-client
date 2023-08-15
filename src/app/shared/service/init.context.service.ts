import { Injectable } from '@angular/core';
import { PsmApiServiceClient } from './psm.api.service';
import { map } from 'rxjs/operators';
import { Items } from '../../model';
import { Dictionary } from '../../model/Dictionary';
import { ICode } from '../../model/code';

class CodeDictionary extends Dictionary {
  constructor() {
    super([]);
  }
  getValues(): ICode[]{
    return this.values;
  }
}
@Injectable({
  providedIn: 'root'
})
export class InitContextService
{
  public APPLICATION_AREA_CODELIST_ID = 11;
  public APPLICATION_TECHNIC_CODELIST_ID = 27;
  public AREA_OF_USE_CODELIST_ID = 4;
  public FIELD_OF_USE_CODELIST_ID = 21;
  public FORMULATION_TYPE_CODELIST_ID = 22;

  public codeDict: Dictionary;
  constructor(private psmApi: PsmApiServiceClient) {}

  initCodeDictionary(): Promise<any> {
    this.codeDict = new CodeDictionary();
    return this.psmApi.getCodeListViaListIdList([
      this.APPLICATION_AREA_CODELIST_ID,
      this.APPLICATION_TECHNIC_CODELIST_ID,
      this.AREA_OF_USE_CODELIST_ID,
      this.FIELD_OF_USE_CODELIST_ID,
      this.FORMULATION_TYPE_CODELIST_ID,
    ]).pipe(
      map((result: Items) => {
        const list: any[] = result.items;
        list.forEach(item => {
           if (!this.codeDict.containsKey(item.kodeliste)) {
             this.codeDict.add(item.kodeliste, [item]);
           }
           else {
             this.codeDict[item.kodeliste].push(item);
           }
         });
      }),
    ).toPromise();
  }

}
