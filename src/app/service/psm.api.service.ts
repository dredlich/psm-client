import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Items } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PsmApiServiceClient {

  BASE_URL = 'https://psm-api.bvl.bund.de/ords/psm/api-v1/';
  DEFAULT_PAGE_SIZE = '200000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCodeListViaListIdList(idList: number[]): Observable<any> {
    let filterIN = '';
    const lastIndex = idList.length - 1;
    idList.forEach((id: number, index: number) => {
      filterIN += '{\"$eq\":' + id + '}';
      if (index !== lastIndex) {
        filterIN += ',';
      }
    });

    const endpoint = '/kode/?q=';
    const filterPart =  '{"sprache":{"$eq":"DE"},"kodeliste":{"$or":[' + filterIN + ']}}';
    const queryUrl: string = this.BASE_URL
      + endpoint
      + encodeURIComponent(filterPart)
      + '&limit=' + 10000;
    console.log(queryUrl);
    return this.http.get<any>(queryUrl).pipe(catchError(this.handleError));
  }

  /**
   * Deprecated
   */
  getCodeListViaCodeListId(codeListId: number): Observable<any> {
    return this.http.get<Items>(this.BASE_URL + '/kode/?' + 'kodeliste=' + codeListId + '&sprache=DE&limit=100')
      .pipe(catchError(this.handleError));
  }
  /**
   * Deprecated
   */
  getCodeViaCodeListId(codeListId: string): Observable<any> {
    return this.http.get<Items>(this.BASE_URL + '/kode/?' + 'kodeliste=' + codeListId + '&sprache=DE&limit=100')
      .pipe(catchError(this.handleError));
  }

  getProductViaPage(pageNumber: number, pageSize: number): Observable<any> {

    const offset = pageNumber * pageSize;
    return this.http.get<Items>(
      this.BASE_URL + '/mittel/?' + 'offset=' + offset + '&limit=' + pageSize
    ).pipe(catchError(this.handleError));
  }

  getProductArray(pageNumber: number, pageSize: number): Observable<any> {
    const offset = pageNumber * pageSize;
    return this.http.get<Items>(
      this.BASE_URL + '/mittel/?' + 'offset=' + offset + '&limit=' + pageSize
    ).pipe(catchError(this.handleError));
  }
  getProductArrayViaAuthorizationStart(startDate): Observable<Items> {
    const date =  startDate.value.format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    const query = '{"ZUL_ERSTMALIG_AM":{"$gt":{"$date": ' + '\"' + date + '\" }}}';
    return this.http.get<Items>(this.BASE_URL
      + '/mittel/?q='
      + encodeURIComponent(query)
      + '&limit='
      + this.DEFAULT_PAGE_SIZE
    ).pipe(catchError(this.handleError));
  }

  getMittelByKennrList(kennrList): Observable<Items> {
    let temp = '';
    // create query filter
    for (const kennr of kennrList){
      temp += '{"$eq":' + '\"' + kennr + '\"' + '},';
    }
    // remove last comma
    temp = temp.substring(0, temp.length - 1);
    const query = '{"KENNR":{"$or":[ '  + temp +  ']}}}';

    return this.http.get<Items>(this.BASE_URL
      + '/mittel/?q='
      + encodeURIComponent(query)
      + '&limit='
      + this.DEFAULT_PAGE_SIZE
    ).pipe(catchError(this.handleError));
  }

  getTopTenAuflagen(): Observable<Items> {
    const topTenQuery = '{"$orderby":"EBENE"}';
    return this.http.get<Items>(
      this.BASE_URL + '/auflagen/?q=' + encodeURIComponent(topTenQuery) + '&limit=' + this.DEFAULT_PAGE_SIZE
      ).pipe(catchError(this.handleError));
  }

  getTopTenHinweise(): Observable<Items> {
    const topTenQuery = '{"$orderby":"KENNR"}';
    return this.http.get<Items>(this.BASE_URL
      + '/ghs_gefahrenhinweise/?q='
      + encodeURIComponent(topTenQuery)
      + '&limit='
      + this.DEFAULT_PAGE_SIZE
    ).pipe(catchError(this.handleError));
  }

  getUseArray(pageIndex: number, pageSize: number): Observable<any> {
    const offset = pageIndex * pageSize;
    return this.http.get<Items>(
      this.BASE_URL + '/awg/?' + 'offset=' + offset + '&limit=' + pageSize
    ).pipe(catchError(this.handleError));
  }

  // Error handling

  handleError(error): Observable<any>{
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    }
    else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
