import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hbrito.citasapp',
  appName: 'citasapp',
  webDir: 'www',
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: false, // Cambia a true si usas encriptación
      androidIsEncryption: false, // Cambia a true si usas encriptación
      webDatabaseLocation: 'indexeddb', // Para soporte en la web
    },
  },
};

export default config;
