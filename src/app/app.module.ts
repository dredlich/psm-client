import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PsmApiServiceClient } from './shared/service/psm.api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableComponent } from './shared/components/table/table.component';
import { ConverterService } from './shared/service/converter.service';
import { InitContextService } from './shared/service/init.context.service';
import { PsmDataTableComponent } from './pages/psm-data-table/psm-data-table.component';
import {MatMenuModule} from '@angular/material/menu';
import {DialogComponent} from './shared/components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

function initializeAppFactory(appContext: InitContextService): () => Promise<any> {
  return () => {
    const promises: Array<Promise<any>> = [];
    promises.push(appContext.initCodeDictionary());
    return Promise.all(promises);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    TableComponent,
    PsmDataTableComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterTestingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [
    ConverterService,
    PsmApiServiceClient,
    { provide: APP_INITIALIZER, multi: true, useFactory: initializeAppFactory, deps: [InitContextService] },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
