import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  faShoppingCart = faShoppingCart;
  routeSub!: Subscription;
  products!: boolean;
  carts!: boolean;
  tabSelected!: string;

  PRODUCTS = 'products';
  CARTS = 'carts';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const url = window.location.href;
    this.tabSelected = url.includes(this.PRODUCTS) ? this.PRODUCTS : this.CARTS;
    this.tabSelected === this.PRODUCTS
      ? (this.products = true)
      : (this.carts = true);
  }

  onTabChange = (tab: string) => {
    if (this.tabSelected === tab) return;
    this.tabSelected = tab;
    this.products = !this.products;
    this.carts = !this.carts;
    this.router.navigate(['/' + tab]);
  };

  ngOnDestroy(): void {}
}
