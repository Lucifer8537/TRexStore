import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FilterDetails } from '../../app.component';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

export interface filterDetailItems {
  checked: boolean;
  option: string | number;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  @Input() filterItems!: FilterDetails[];
  @Input() filterHeight!: number;

  colorsList: filterDetailItems[] = [];
  genderList: filterDetailItems[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onFilterSelected = () => {
    console.log('filterItems : ', this.filterItems);
  };

  // onSelectFilter = (item: filterDetailItems, index: number, option: string) => {
  //   switch (option) {
  //     case 'Colors':
  //       this.colorsList[index].checked = !this.colorsList[index].checked;
  //       console.log('this.colorsList : ', this.colorsList);
  //       this.cdr.markForCheck();
  //       break;
  //     case 'Genders':
  //       this.genderList[index].checked = !this.genderList[index].checked;
  //       console.log('this.genderList : ', this.genderList);
  //       this.cdr.markForCheck();
  //       break;
  //     case
  //     default:
  //       console.log('default!!');
  //       break;
  //   }
  // };
}
