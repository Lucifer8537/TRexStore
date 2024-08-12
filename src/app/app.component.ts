import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { CartsComponent } from './carts/carts.component';
import {
  FilterComponent,
  filterDetailItems,
} from './products/filter/filter.component';
import { CommonModule } from '@angular/common';

export interface ArticleDetails {
  id: number;
  imageURL: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  color: string;
  gender: string;
  quantity: number;
  addedCart?: boolean;
}

export interface FilterDetails {
  label: string;
  filterItems: filterDetailItems[];
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ProductsComponent,
    CartsComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
