import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      // registrationStrategy: 'registerWhenStable:30000',
      registrationStrategy: 'registerImmediately'
    }),
  ],
};
