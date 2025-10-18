import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { playerFactory } from './lottie-factory';
import { provideLottieOptions } from 'ngx-lottie';
import { LottieAnimationViewModule } from 'ng-lottie';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideRouter(routes),
    provideLottieOptions({ player: playerFactory }),
  ],
};
