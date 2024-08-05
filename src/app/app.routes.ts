import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartsComponent } from './carts/carts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'carts', component: CartsComponent },
];
