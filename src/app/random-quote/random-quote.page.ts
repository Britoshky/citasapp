import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QuoteService, Quote } from '../services/quote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-random-quote',
  templateUrl: './random-quote.page.html',
  styleUrls: ['./random-quote.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class RandomQuotePage implements OnInit, OnDestroy {
  quote: Quote | null = null;
  allowDeleteQuotes: boolean = false;
  intervalId: any;
  quotesPool: Quote[] = []; // Lista temporal para manejar las citas sin repetición

  constructor(private quoteService: QuoteService, private router: Router) {}

  async ngOnInit() {
    try {
      const initialized = await this.quoteService.initializePlugin();
      if (initialized) {
        await this.initializePage();
      } else {
        console.error('Failed to initialize SQLite database.');
      }
    } catch (error) {
      console.error('Error initializing page:', error);
    }
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  async ionViewWillEnter() {
    try {
      await this.loadAllowDeleteQuotes();
      await this.loadQuotes();
      this.setRandomQuote();
    } catch (error) {
      console.error('Error in ionViewWillEnter:', error);
    }
  }

  private async initializePage() {
    try {
      await this.loadAllowDeleteQuotes();
      await this.loadQuotes();
      this.startTimer();
    } catch (error) {
      console.error('Error initializing random quote page:', error);
    }
  }

  private async loadAllowDeleteQuotes() {
    try {
      this.allowDeleteQuotes = await this.quoteService.getAllowDeleteQuotes();
    } catch (error) {
      console.error('Error loading allowDeleteQuotes preference:', error);
      this.allowDeleteQuotes = false;
    }
  }

  private async loadQuotes() {
    try {
      const allQuotes = this.quoteService.getAllQuotes();
      this.quotesPool = [...allQuotes]; // Clona la lista completa de citas
      if (!this.quote && allQuotes.length > 0) {
        this.setRandomQuote();
      }
    } catch (error) {
      console.error('Error loading quotes:', error);
    }
  }

  private setRandomQuote() {
    if (this.quotesPool.length === 0) {
      // Reinicia la lista si ya se mostraron todas las citas
      this.quotesPool = [...this.quoteService.getAllQuotes()];
    }
    if (this.quotesPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.quotesPool.length);
      this.quote = this.quotesPool[randomIndex];
      this.quotesPool.splice(randomIndex, 1); // Elimina la cita seleccionada de la lista temporal
    } else {
      this.quote = null;
    }
  }

  private startTimer() {
    this.clearTimer();
    this.intervalId = setInterval(() => {
      this.setRandomQuote();
    }, 5000);
  }

  private clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  async deleteCurrentQuote() {
    if (this.quote && this.allowDeleteQuotes) {
      try {
        await this.quoteService.deleteQuote(this.quote.id);
        await this.loadQuotes(); // Recarga las citas disponibles
        this.setRandomQuote();
      } catch (error) {
        console.error('Error deleting quote:', error);
      }
    }
  }

  goToManageQuotes() {
    this.router.navigate(['/manage-quotes']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
