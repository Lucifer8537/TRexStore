import {
  ChangeDetectorRef,
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
import { label } from '../shared/label';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardViewComponent, CommonModule, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  @ViewChild('product', { static: true }) product!: ElementRef;

  readonly Label = label;

  products: ArticleDetails[] = mockData;
  filterItems: FilterDetails[] = [];
  filterSubs!: Subscription;
  columnExp!: string;
  filtersColor: string[] = [];
  filtersType: string[] = [];
  filtersGender: string[] = [];
  filterOption = ['0-250', '250-450', 'above 450'];
  filterValues = [0, 250, 450];
  costFilter: string[] = [];
  productListingWidth!: number;
  searchSubs!: Subscription;
  saveProducts!: ArticleDetails[];
  constructor(
    private dts: DataTransferService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize = () => this.initColumnNumbers();

  ngOnInit(): void {
    this.initColumnNumbers();
    this.saveProducts = this.products;
    this.searchSubs = this.dts.serachSubs.subscribe({
      next: (search) => {
        if (search) {
          const lowerCaseSearch = search.toLowerCase();
          this.products = this.saveProducts.filter(
            (save) =>
              save &&
              (save.name.toLowerCase().includes(lowerCaseSearch) ||
                save.type.toLowerCase().includes(lowerCaseSearch) ||
                save.gender.toLowerCase().includes(lowerCaseSearch))
          );
        } else {
          this.products = mockData;
        }
      },
      error: (e) => console.error(e),
      complete: () => this.cdr.markForCheck(),
    });
    this.filterSubs = this.dts.filterItemsSubs.subscribe({
      next: (filter) => this.applyFilter(filter),
      error: (e) => console.error(e),
      complete: () => this.cdr.markForCheck(),
    });
    this.initFilters();
  }

  private initColumnNumbers = () => {
    const width = this.product.nativeElement.offsetWidth;
    let columnNumber = Math.trunc(width / 250);
    const view = columnNumber * 250 + (columnNumber - 1) * 20;
    if (view > width) columnNumber--;
    this.productListingWidth = columnNumber * 250 + (columnNumber - 1) * 20;
    this.columnExp = 'repeat(' + columnNumber + ', min-content)';
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
      label: this.Label.color,
      filterItems: this.getFilterItems([...colorSets]),
    });
    this.filterItems.push({
      label: this.Label.gender,
      filterItems: this.getFilterItems([...genderSets]),
    });
    this.filterItems.push({
      label: this.Label.price,
      filterItems: this.getFilterItems(this.filterOption),
    });
    this.filterItems.push({
      label: this.Label.type,
      filterItems: this.getFilterItems([...typeSets]),
    });
  };

  private getFilterItems = (list: string[]): filterDetailItems[] => {
    const filterList: filterDetailItems[] = [];
    list.forEach((l) => l && filterList.push({ checked: false, option: l }));
    return filterList;
  };

  private applyFilter = (filter: FilterDetails[]) => {
    this.filterItems = filter;
    this.filtersColor = [];
    this.filtersGender = [];
    this.filtersType = [];
    this.costFilter = [];
    this.filterItems.map(
      (filt) =>
        filt &&
        filt.filterItems.map((item) => {
          if (item && item.checked) {
            switch (filt.label) {
              case this.Label.color:
                this.filtersColor.push(item.option);
                break;
              case this.Label.gender:
                this.filtersGender.push(item.option);
                break;
              case this.Label.type:
                this.filtersType.push(item.option);
                break;
              case this.Label.price:
                this.costFilter.push(item.option);
            }
          }
        })
    );
    let filtProd: ArticleDetails[] = mockData;
    if (this.filtersColor && this.filtersColor.length) {
      filtProd = filtProd.filter((mock) => {
        if (mock) {
          const result = this.filtersColor.some(
            (color) => color && mock.color === color
          );
          return result;
        }
        return false;
      });
    }
    if (this.filtersType && this.filtersType.length) {
      filtProd = filtProd.filter((mock) => {
        if (mock) {
          const result = this.filtersType.some(
            (type) => type && mock.type === type
          );
          return result;
        }
        return false;
      });
    }
    if (this.filtersGender && this.filtersGender.length) {
      filtProd = filtProd.filter((mock) => {
        if (mock) {
          const result = this.filtersGender.some(
            (gender) => gender && mock.gender === gender
          );
          return result;
        }
        return false;
      });
    }

    if (this.costFilter && this.costFilter.length) {
      const costIndex: number[] = [];
      this.costFilter.map((cost) => {
        const index = this.filterOption.findIndex((c) => c && c == cost);
        costIndex.push(index);
      });
      console.log(costIndex);
      filtProd = filtProd.filter((mock) => {
        if (mock) {
          const result = costIndex.some((index) => {
            if (
              index !== this.filterValues.length - 1 &&
              this.filterValues[index] <= mock.price &&
              this.filterValues[index + 1] > mock.price
            ) {
              return true;
            } else if (
              index === this.filterValues.length - 1 &&
              this.filterValues[index] <= mock.price
            ) {
              return true;
            }
            return false;
          });
          return result;
        }
        return false;
      });
    }
    if (
      (this.filtersColor && this.filtersColor.length) ||
      (this.filtersType && this.filtersType.length) ||
      (this.filtersGender && this.filtersGender.length) ||
      (this.costFilter && this.costFilter.length)
    )
      this.products = filtProd;
    else this.products = mockData;
    this.saveProducts = this.products;
    this.cdr.markForCheck();
  };
}
