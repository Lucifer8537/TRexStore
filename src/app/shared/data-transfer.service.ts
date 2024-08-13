import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterDetails } from '../app.component';

export interface cartObj {
  id: number;
  imageURL: string;
  name: string;
  price: number;
  currency: string;
  gender: string;
  quantity: number;
  itemNumber: number;
}

@Injectable({ providedIn: 'root' })
export class DataTransferService {
  filterItems!: FilterDetails[];
  filterItemsSubs = new Subject<FilterDetails[]>();
  serachSubs = new Subject<string>();
  cartList: cartObj[] = [];

  getFilterDetails = (): FilterDetails[] => this.filterItems;

  setFilterDetails = (filter: FilterDetails[]) => {
    this.filterItems = filter;
    this.filterItemsSubs.next(this.filterItems);
  };

  setCartList = (carItem: cartObj) => {
    this.cartList.push(carItem);
    console.log(this.cartList);
  };

  getCartList = (): cartObj[] => this.cartList;
}
