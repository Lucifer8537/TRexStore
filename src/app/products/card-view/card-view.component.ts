import { Component, Input, OnInit } from '@angular/core';
import { ArticleDetails } from '../../app.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPersonDress,
  faPerson,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { label } from '../../shared/label';
import {
  cartObj,
  DataTransferService,
} from '../../shared/data-transfer.service';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent implements OnInit {
  @Input() item!: ArticleDetails;

  readonly LABEL = label;

  faPerson = faPerson;
  faPersonDress = faPersonDress;
  btnLabel!: string;
  noItem!: boolean;

  constructor(private router: Router, private dts: DataTransferService) {}

  ngOnInit(): void {
    this.noItem = this.item.quantity === 0;
    this.noItem ? (this.btnLabel = 'Out of Stock') : this.checkBtn();
  }

  onAddCart = () => {
    if (this.item.addedCart) {
      this.router.navigate(['/carts']);
    } else {
      const cartItem: cartObj = {
        id: this.item.id,
        currency: this.item.currency,
        gender: this.item.gender,
        imageURL: this.item.imageURL,
        itemNumber: 1,
        name: this.item.name,
        price: this.item.price,
        quantity: this.item.quantity,
      };
      this.dts.setCartList(cartItem);
      this.item.addedCart = true;
      this.checkBtn();
    }
  };

  private checkBtn = () =>
    (this.btnLabel = this.item.addedCart
      ? this.LABEL.goToCart
      : this.LABEL.addCart);
}
