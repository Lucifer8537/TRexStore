import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataTransferService } from '../shared/data-transfer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  faShoppingCart = faShoppingCart;
  routeSub!: Subscription;
  products!: boolean;
  carts!: boolean;
  tabSelected!: string;
  search: string = '';

  PRODUCTS = 'products';
  CARTS = 'carts';

  constructor(private router: Router, private dts: DataTransferService) {}

  ngOnInit(): void {
    const url = window.location.href;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        this.tabSelected = url.includes(this.CARTS)
          ? this.CARTS
          : this.PRODUCTS;
        this.products = url.includes(this.PRODUCTS);
        this.carts = url.includes(this.CARTS);
      }
    });
    this.tabSelected = url.includes(this.CARTS) ? this.CARTS : this.PRODUCTS;
    this.products = this.tabSelected === this.PRODUCTS;
    this.carts = this.tabSelected === this.CARTS;
  }

  onTabChange = (tab: string) => {
    if (this.tabSelected === tab) return;
    this.tabSelected = tab;
    this.products = !this.products;
    this.carts = !this.carts;
    this.router.navigate(['/' + tab]);
  };

  onSearchChange = (text: string) => this.dts.serachSubs.next(text);

  ngOnDestroy(): void {}
}
