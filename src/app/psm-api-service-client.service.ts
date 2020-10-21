import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Items } from './shared/items';

@Injectable({
  providedIn: 'root'
})
export class PsmApiServiceClientService {

  BASE_URL = 'https://psm.tech4germany.org:8443/ords/psm/api-v1/';
  DEFAULT_PAGE_SIZE = '&limit=200000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getMittel(startDate): Observable<Items> {
    const date =  startDate.value.format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    const query = '{"ZUL_ERSTMALIG_AM":{"$gt":{"$date": ' + '\"' + date + '\" }}}';
    return this.http.get<Items>(this.BASE_URL + '/mittel/?q=' + encodeURIComponent(query) + this.DEFAULT_PAGE_SIZE)
      .pipe(catchError(this.handleError));
  }

  getMittelByKennrList(kennrList): Observable<Items> {
    let temp = '';
    // create query filter
    for (const kennr of kennrList){
      temp += '{"$eq":' + '\"' + kennr + '\"' + '},';
    }
    // remove last comma
    temp = temp.substr(0, temp.length - 1);
    const query = '{"KENNR":{"$or":[ '  + temp +  ']}}}';

    return this.http.get<Items>(this.BASE_URL + '/mittel/?q=' + encodeURIComponent(query) + this.DEFAULT_PAGE_SIZE)
      .pipe(catchError(this.handleError));
  }

  getTopTenAuflagen(): Observable<Items> {
    const topTenQuery = '{"$orderby":"EBENE"}';
    return this.http.get<Items>(
      this.BASE_URL + '/auflagen/?q=' + encodeURIComponent(topTenQuery) + this.DEFAULT_PAGE_SIZE
      ).pipe(catchError(this.handleError));
  }

  getTopTenHinweise(): Observable<Items> {
    const topTenQuery = '{"$orderby":"KENNR"}';
    return this.http.get<Items>(this.BASE_URL + '/ghs_gefahrenhinweise/?q=' + encodeURIComponent(topTenQuery) + this.DEFAULT_PAGE_SIZE)
      .pipe(catchError(this.handleError)
      );
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
