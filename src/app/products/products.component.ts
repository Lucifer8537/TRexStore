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
export class ProductsComponent implements OnInit {
  products: ArticleDetails[] = mockData;
  filterItems: FilterDetails[] = [];

  constructor(private dts: DataTransferService) {}

  ngOnInit(): void {
    this.initFilters();
  }

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
    console.log('filterItems : ', this.filterItems);
  };

  private getFilterItems = (list: string[] | number[]): filterDetailItems[] => {
    const filterList: filterDetailItems[] = [];
    list.forEach((l) => l && filterList.push({ checked: false, option: l }));
    return filterList;
  };
}
