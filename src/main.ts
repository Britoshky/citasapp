import { bootstrapApplication } from '@angular/platform-browser';
import '@angular/compiler'; // Compilador JIT
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, settings, trash } from 'ionicons/icons'; // Íconos necesarios
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Inicializa el componente Jeep-SQLite
jeepSqlite();

addIcons({
  add,
  settings,
  trash,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
