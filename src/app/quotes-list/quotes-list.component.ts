import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class QuotesListComponent {
  @Input() quotes: { id: number; phrase: string; author: string }[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() deleteQuote = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  onDeleteQuote(id: number) {
    this.deleteQuote.emit(id);
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
}
