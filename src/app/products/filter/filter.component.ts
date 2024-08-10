import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FilterDetails } from '../../app.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { DataTransferService } from '../../shared/data-transfer.service';

export interface filterDetailItems {
  checked: boolean;
  option: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  @Input() filterItems!: FilterDetails[];

  colorsList: filterDetailItems[] = [];
  genderList: filterDetailItems[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private dts: DataTransferService
  ) {}

  ngOnInit(): void {}

  onFilterSelected = (index: number, subIndex: number, oldVal: boolean) => {
    this.filterItems[index].filterItems[subIndex].checked = !oldVal;
    console.log('this.filterItems : ', this.filterItems);
    this.dts.filterItemsSubs.next(this.filterItems);
  };
}
