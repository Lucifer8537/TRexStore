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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkBtn();
  }

  onAddCart = () => {
    if (this.item.addedCart) {
      this.router.navigate(['/carts']);
    } else {
      this.item.addedCart = true;
      this.checkBtn();
    }
  };

  private checkBtn = () =>
    (this.btnLabel = this.item.addedCart
      ? this.LABEL.goToCart
      : this.LABEL.addCart);
}
