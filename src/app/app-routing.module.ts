import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PsmDataTableComponent } from './pages/psm-data-table/psm-data-table.component';

const routes: Routes = [
  { path: 'psm-api-table', component: PsmDataTableComponent },
  { path: '',   redirectTo: '/psm-api-table', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
