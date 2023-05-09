import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDataTableComponent } from './pages/products/product-data-table.component';
import { UsesDataTableComponent } from './pages/uses/uses-data-table.component';
import { codeResolver } from './initialize.resolver';

const routes: Routes = [
  { path: 'home', component: HomeComponent, resolve: { response: codeResolver } },
  { path: 'products', component: ProductDataTableComponent, resolve: { response: codeResolver } },
  { path: 'uses', component: UsesDataTableComponent },
  { path: '',   redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
