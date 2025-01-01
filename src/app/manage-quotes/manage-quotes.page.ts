import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { QuotesListComponent } from '../quotes-list/quotes-list.component'; // Asegúrate de que la ruta sea correcta
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-manage-quotes',
  templateUrl: './manage-quotes.page.html',
  styleUrls: ['./manage-quotes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, QuotesListComponent],
})
export class ManageQuotesPage implements OnInit {
  quotes: { id: number; phrase: string; author: string }[] = [];
  displayedQuotes: { id: number; phrase: string; author: string }[] = [];
  quoteForm: FormGroup;
  paginatedQuotes: { id: number; phrase: string; author: string }[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  isDatabaseInitialized: boolean = false;

  constructor(
    private quoteService: QuoteService,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    this.quoteForm = this.fb.group({
      phrase: ['', [Validators.required, Validators.minLength(5)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  async ngOnInit() {
    this.isDatabaseInitialized = await this.initializeDatabase();
    if (this.isDatabaseInitialized) {
      await this.refreshQuotes();
    }
  }

  async initializeDatabase(): Promise<boolean> {
    try {
      const initialized = await this.quoteService.initializePlugin();
      if (!initialized) {
        this.showToast('Error inicializando la base de datos.');
      }
      return initialized;
    } catch (error) {
      console.error('Error initializing database:', error);
      this.showToast('Error inicializando la base de datos.');
      return false;
    }
  }

  async refreshQuotes() {
    try {
      this.quotes = await this.quoteService.getAllQuotes();
      this.totalPages = Math.ceil(this.quotes.length / this.itemsPerPage);
      // Siempre muestra la página actual después de actualizar las citas
      this.displayPage(this.currentPage > this.totalPages ? this.totalPages : this.currentPage);
    } catch (error) {
      console.error('Error refreshing quotes:', error);
      this.showToast('Error al cargar las citas. Por favor, intenta nuevamente.');
    }
  }

  updatePaginatedQuotes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedQuotes = this.quotes.slice(start, end);
  }


  async addQuote(): Promise<void> {
    if (this.quoteForm.valid) {
      const { phrase, author } = this.quoteForm.value;
      try {
        if (!this.isDatabaseInitialized) {
          this.isDatabaseInitialized = await this.initializeDatabase();
          if (!this.isDatabaseInitialized) return;
        }
  
        await this.quoteService.addQuote(phrase, author);
        await this.refreshQuotes(); // Refresca las citas después de agregar
        this.resetForm();
        this.showToast('Cita añadida exitosamente.');
      } catch (error) {
        console.error('Error adding quote:', error);
        this.showToast('Error al añadir la cita. Por favor, intenta nuevamente.');
      }
    } else {
      this.quoteForm.markAllAsTouched();
      this.showToast('Por favor, completa todos los campos correctamente.');
    }
  }

  async deleteQuote(id: number): Promise<void> {
    try {
      await this.quoteService.deleteQuote(id);
      await this.refreshQuotes();
      this.showToast('Cita eliminada exitosamente.');
    } catch (error) {
      console.error('Error deleting quote:', error);
      this.showToast(
        'Error al eliminar la cita. Por favor, intenta nuevamente.'
      );
    }
  }

  displayPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
  
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedQuotes = this.quotes.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.displayPage(this.currentPage - 1);
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.displayPage(this.currentPage + 1);
    }
  }

  resetForm() {
    this.quoteForm.reset();
    this.quoteForm.markAsPristine();
    this.quoteForm.markAsUntouched();
  }

  get phraseControl() {
    return this.quoteForm.get('phrase');
  }

  get authorControl() {
    return this.quoteForm.get('author');
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
