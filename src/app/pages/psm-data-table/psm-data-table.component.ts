import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PsmApiServiceClient} from '../../shared/service/psm.api.service';
import {Observable, throwError} from 'rxjs';
import {MatOptionSelectionChange} from '@angular/material/core';
import {TableComponent} from '../../shared/components/table/table.component';
import {TableParamModel} from '../../model/table/table.param.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogComponent} from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-psm-data-table',
  templateUrl: './psm-data-table.component.html',
  styleUrls: ['./psm-data-table.component.css']
})
export class PsmDataTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(TableComponent) tableComponent: TableComponent;

  data: any[];
  endpoints = [
    'adresse',
    'antrag',
    'auflage_redu',
    'auflagen',
    'awg',
    'awg_aufwand',
    'awg_bem',
    'awg_kultur',
    'awg_partner',
    'awg_partner_aufwand',
    'awg_schadorg',
    'awg_verwendungszweck',
    'awg_wartezeit',
    'awg_wartezeit_ausg_kultur',
    'awg_zeitpunkt',
    'awg_zulassung',
    'ghs_gefahrenhinweise',
    'ghs_gefahrensymbole',
    'ghs_sicherheitshinweise',
    'ghs_signalwoerter',
    'hinweis',
    'kode',
    'kodeliste',
    'kodeliste_feldname',
    'kultur_gruppe',
    'mittel',
    'mittel_abgelaufen',
    'mittel_abpackung',
    'mittel_gefahren_symbol',
    'mittel_vertrieb',
    'mittel_wirkbereich',
    'parallelimport_abgelaufen',
    'parallelimport_gueltig',
    'schadorg_gruppe',
    'staerkung',
    'staerkung_vertrieb',
    'wirkstoff',
    'wirkstoff_gehalt',
    'zusatzstoff',
    'zusatzstoff_vertrieb',
  ];
  keyMapEndpoint = {
    kennr: [{
      tableName: 'antrag',
      parameterName: 'kennr'
    }, {
      tableName: 'auflagen',
      parameterName: 'ebene'
    }, {
      tableName: 'awg',
      parameterName: 'kennr'
    }, {
      tableName: 'ghs_gefahrenhinweise',
      parameterName: 'kennr'
    }, {
      tableName: 'ghs_gefahrensymbole',
      parameterName: 'kennr'
    }, {
      tableName: 'ghs_sicherheitshinweise',
      parameterName: 'kennr',
    }, {
      tableName: 'ghs_signalwoerter',
      parameterName: 'kennr',
    }, {
      tableName: 'hinweis',
      parameterName: 'ebene'
    }, {
      tableName: 'mittel',
      parameterName: 'kennr'
    }, {
      tableName: 'mittel_abgelaufen',
      parameterName: 'kennr'
    }, {
      tableName: 'mittel_abpackung',
      parameterName : 'kennr'
    }, {
      tableName: 'mittel_gefahren_symbol',
      parameterName: 'kennr'
    }, {
      tableName: 'mittel_vertrieb',
      parameterName: 'kennr'
    }, {
      tableName: 'mittel_wirkbereich',
      parameterName: 'kennr'
    }, {
      tableName: 'parallelimport_abgelaufen',
      parameterName: 'kennr'
    }, {
      tableName: 'parallelimport_gueltig',
      parameterName: 'kennr'
    }, {
      tableName: 'zusatzstoff',
      parameterName: 'kennr'
    }
    ],
    auflagenr: [
      { tableName: 'auflagen', parameterName: 'auflagenr'},
      { tableName: 'auflage_redu', parameterName: 'auflagenr'}
    ],
    awg_id: [
      { tableName: 'auflagen' , parameterName: 'ebene' },
      { tableName: 'awg' , parameterName: 'awg_id' },
      { tableName: 'hinweis' , parameterName: 'ebene' },
    ]
  };
  selectedEndpoint = this.endpoints[0];
  previousSelectedEndpoint: string;

  pageIndex = 0;
  pageSize = 5;
  pageSizeSelectCtrlValue = this.pageSize.toString();
  hasNext = false;
  hasPrev = false;
  isLoading = false;
  constructor(private psmApiClient: PsmApiServiceClient, public dialog: MatDialog) {}

  changeSelectedTable(param: TableParamModel): void {
    this.previousSelectedEndpoint = this.selectedEndpoint;
    this.selectedEndpoint = param.tableName;
    this.loadData(this.selectedEndpoint, param.parameterName, param.parameterValue);
  }

  ngOnInit(): void { }
  ngOnDestroy(): void {  }

  ngAfterViewInit(): void {
    console.log('Values on ngAfterViewInit():');
    console.log('tableComponent:', this.tableComponent);
  }
  loadData(path: string, paramName?: string, paramValue?: string): void {
    this.isLoading = true;

    const pn = null == paramName ? '' : paramName;
    const pv =  null == paramValue ? '' : paramValue;

    const callUrl = path + '?' + pn + '=' + pv + '&';
    this.psmApiClient.getData(callUrl, this.pageIndex, this.pageSize).subscribe(response => {
      this.isLoading = false;
      if (response.links) {
        this.hasNext = null != response.links.find(x => x.rel === 'next');
        this.hasPrev = null != response.links.find(x => x.rel === 'prev');
      }
      if (response.items.length === 0) {
        this.selectedEndpoint = this.previousSelectedEndpoint;
        this.openDialog('Info', 'No Data Found');
      } else {
        this.data = response.items;
      }
    });
  }

  openDialog(title: string, message: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = ['dialog-panel'];
    dialogConfig.data = { title, message };
    this.dialog.open(DialogComponent, dialogConfig);
  }

  selectionChanged($event: MatOptionSelectionChange<string>): void {
    if ($event.isUserInput || null == this.previousSelectedEndpoint) {
      // if (null == this.previousSelectedEndpoint || this.previousSelectedEndpoint !== $event.source.value) {
        this.loadData($event.source.value);
        this.previousSelectedEndpoint = this.selectedEndpoint;
        this.selectedEndpoint = $event.source.value;
      // }
    }
  }

  changePageSize(): void {
    this.pageSize = parseInt(this.pageSizeSelectCtrlValue, undefined);
    this.loadData(this.selectedEndpoint);
  }
  nextPage(): void {
    this.pageIndex++;
    this.loadData(this.selectedEndpoint);
  }
  prevPage(): void {
    if (this.pageIndex) {
      this.pageIndex--;
      this.loadData(this.selectedEndpoint);
    }
  }

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
