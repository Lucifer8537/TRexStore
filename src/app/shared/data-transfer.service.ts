import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterDetails } from '../app.component';

@Injectable({ providedIn: 'root' })
export class DataTransferService {
  headerHeight!: number;
  headerHeigthSub = new Subject<number>();
  filterItems!: FilterDetails[];

  getHeaderHeight = (): number => this.headerHeight;

  setHeaderHeight = (height: number) => {
    this.headerHeight = height;
    this.headerHeigthSub.next(this.headerHeight);
  };

  getFilterDetails = (): FilterDetails[] => this.filterItems;

  setFilterDetails = (filter: FilterDetails[]) => (this.filterItems = filter);
}
