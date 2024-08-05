import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { mockData } from '../mock-data';
import { ArticleDetails, FilterDetails } from '../app.component';
import { CardViewComponent } from './card-view/card-view.component';
import { CommonModule } from '@angular/common';
import { FilterComponent, filterDetailItems } from './filter/filter.component';
import { DataTransferService } from '../shared/data-transfer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardViewComponent, CommonModule, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('product', { static: true }) productElem!: ElementRef;

  products: ArticleDetails[] = mockData;
  headerHeight!: number;
  heightSubs!: Subscription;
  filterItems: FilterDetails[] = [];
  innerHeight!: number;
  filterHeight!: number;
  productWidth!: number;

  constructor(private dts: DataTransferService) {}

  @HostListener('window:resize', ['$event'])
  onResize = (event: Event) => this.calculateHeight();

  ngOnInit(): void {
    this.headerHeight = this.dts.getHeaderHeight();
    this.calculateHeight();
    this.heightSubs = this.dts.headerHeigthSub.subscribe((height) => {
      this.headerHeight = height;
      this.calculateHeight();
    });
    this.initFilters();
  }

  private calculateHeight = () => {
    this.innerHeight = window.innerHeight;
    this.filterHeight = this.innerHeight - this.headerHeight;
    this.productWidth = this.productElem.nativeElement.innerWidth;
    console.log('productWidth : ', this.productWidth);
  };

  private initFilters = () => {
    const colorSets = new Set<string>();
    const genderSets = new Set<string>();
    const typeSets = new Set<string>();
    this.products.forEach(
      (product) =>
        product &&
        product.color &&
        colorSets.add(product.color) &&
        product.gender &&
        genderSets.add(product.gender) &&
        product.type &&
        typeSets.add(product.type)
    );
    this.filterItems.push({
      label: 'Colors',
      filterItems: this.getFilterItems([...colorSets]),
    });
    this.filterItems.push({
      label: 'Genders',
      filterItems: this.getFilterItems([...genderSets]),
    });
    this.filterItems.push({
      label: 'Prices',
      filterItems: this.getFilterItems([0, 250, 450]),
    });
    this.filterItems.push({
      label: 'Types',
      filterItems: this.getFilterItems([...typeSets]),
    });
  };

  private getFilterItems = (list: string[] | number[]): filterDetailItems[] => {
    const filterList: filterDetailItems[] = [];
    list.forEach((l) => l && filterList.push({ checked: false, option: l }));
    return filterList;
  };

  ngOnDestroy(): void {
    this.heightSubs.unsubscribe();
  }
}
