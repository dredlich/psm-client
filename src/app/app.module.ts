import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PsmApiServiceClient } from './service/psm.api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';

import { HomeComponent } from './pages/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ProductDataTableComponent } from './pages/products/product-data-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { UsesDataTableComponent } from './pages/uses/uses-data-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableComponent } from './components/table/table.component';
import { ConverterService } from './service/converter.service';
import { CardComponent } from './components/card/card.component';



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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDataTableComponent,
    UsesDataTableComponent,
    TableComponent,
    CardComponent,
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
  ],
  providers: [
    ConverterService,
    PsmApiServiceClient,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
