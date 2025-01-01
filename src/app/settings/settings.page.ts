import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], // FormsModule necesario para [(ngModel)]
})
export class SettingsPage implements OnInit {
  allowDeleteQuotes: boolean = false;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.loadSettings();
  }

  async loadSettings() {
    this.allowDeleteQuotes = await this.quoteService.getAllowDeleteQuotes();
  }

  saveSettings() {
    this.quoteService.setAllowDeleteQuotes(this.allowDeleteQuotes);
    alert('Configuración guardada correctamente.');
  }
}
