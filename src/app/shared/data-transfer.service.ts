import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterDetails } from '../app.component';

@Injectable({ providedIn: 'root' })
export class DataTransferService {
  filterItems!: FilterDetails[];
  filterItemsSubs = new Subject<FilterDetails[]>();

  getFilterDetails = (): FilterDetails[] => this.filterItems;

  setFilterDetails = (filter: FilterDetails[]) => {
    this.filterItems = filter;
    this.filterItemsSubs.next(this.filterItems);
  };
}
