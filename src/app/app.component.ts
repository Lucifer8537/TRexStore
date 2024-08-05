import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { CartsComponent } from './carts/carts.component';
import {
  FilterComponent,
  filterDetailItems,
} from './products/filter/filter.component';
import { mockData } from './mock-data';
import { CommonModule } from '@angular/common';
import { DataTransferService } from './shared/data-transfer.service';

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
    FilterComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('header', { static: true }) header!: ElementRef;

  readonly mockData: ArticleDetails[] = mockData;

  headerHeight!: number;

  constructor(private dts: DataTransferService) {}

  ngOnInit(): void {
    this.headerHeight = this.header.nativeElement.offsetHeight;
    this.dts.setHeaderHeight(this.headerHeight);
  }
}
