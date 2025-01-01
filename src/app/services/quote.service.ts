import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

const DB_QUOTES = 'quotes_db';

export interface Quote {
  id: number;
  phrase: string;
  author: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private quotes: Quote[] = [];

  constructor() {}

  // Inicializa el plugin SQLite y crea la base de datos
  async initializePlugin(): Promise<boolean> {
    try {
      const platform = Capacitor.getPlatform();

      if (platform === 'web') {
        // Verifica que <jeep-sqlite> esté en el DOM
        const jeepSqliteEl = document.querySelector('jeep-sqlite');
        if (!jeepSqliteEl) {
          console.error(
            'El elemento <jeep-sqlite> no está presente en el DOM.'
          );
          return false;
        }

        await customElements.whenDefined('jeep-sqlite');

        // Inicializa el almacenamiento web
        await CapacitorSQLite.initWebStore();

      }

      // Continúa con la inicialización de la base de datos
      this.db = await this.sqlite.createConnection(
        DB_QUOTES,
        false,
        'no-encryption',
        1,
        false
      );
      await this.db.open();

      const schema = `
            CREATE TABLE IF NOT EXISTS quotes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                phrase TEXT NOT NULL,
                author TEXT NOT NULL
            );
        `;
      await this.db.execute(schema);
      await this.loadQuotes();

      return true;
    } catch (error) {
      console.error('Error initializing SQLite:', error);
      return false;
    }
  }

  // Carga todas las citas de la base de datos
  private async loadQuotes(): Promise<void> {
    try {
      const result = await this.db.query(
        'SELECT id, phrase, author FROM quotes'
      );
      this.quotes = (result.values as Quote[]) || [];
    } catch (error) {
      console.error('Error loading quotes:', error);
    }
  }

  // Devuelve todas las citas
  getAllQuotes(): Quote[] {
    return this.quotes;
  }

  // Agrega una nueva cita a la base de datos
  async addQuote(phrase: string, author: string): Promise<void> {
    try {
      const statement = 'INSERT INTO quotes (phrase, author) VALUES (?, ?)';
      await this.db.run(statement, [phrase, author]);
      await this.loadQuotes();
  
      // Guarda la base de datos en el almacenamiento del navegador (solo para web)
      if (Capacitor.getPlatform() === 'web') {
        await this.sqlite.saveToStore(DB_QUOTES);
      }
  
    } catch (error) {
      console.error('Error adding quote:', error);
    }
  }
  
  // Elimina una cita por su ID
  async deleteQuote(id: number): Promise<void> {
    try {
      const statement = 'DELETE FROM quotes WHERE id = ?';
      await this.db.run(statement, [id]);
      await this.loadQuotes();
  
      // Guarda la base de datos en el almacenamiento del navegador (solo para web)
      if (Capacitor.getPlatform() === 'web') {
        await this.sqlite.saveToStore(DB_QUOTES);
      }
  
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  }

  // Obtiene la configuración para permitir eliminar citas
  async getAllowDeleteQuotes(): Promise<boolean> {
    try {
      const { value } = await Preferences.get({ key: 'allowDeleteQuotes' });
      return value === 'true';
    } catch (error) {
      console.error('Error retrieving allowDeleteQuotes preference:', error);
      return false;
    }
  }

  // Establece la configuración para permitir eliminar citas
  async setAllowDeleteQuotes(value: boolean): Promise<void> {
    try {
      await Preferences.set({ key: 'allowDeleteQuotes', value: String(value) });
    } catch (error) {
      console.error('Error saving allowDeleteQuotes preference:', error);
    }
  }
}
