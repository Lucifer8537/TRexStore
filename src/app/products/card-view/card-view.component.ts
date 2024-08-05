import { Component, Input } from '@angular/core';
import { ArticleDetails } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent {
  @Input() item!: ArticleDetails;
}
