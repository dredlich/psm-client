import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDataTableComponent } from './pages/products/product-data-table.component';
import { UsesDataTableComponent } from './pages/uses/uses-data-table.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductDataTableComponent },
  { path: 'uses', component: UsesDataTableComponent },
  { path: '',   redirectTo: '/uses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
