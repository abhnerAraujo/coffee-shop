import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  ScreenTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideBrewingRepository,
  provideRemoteBrewingRepository,
} from './features/brewing/infra';
import { provideHistoryRepository } from './features/history/infra';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: FIREBASE_ENV.FIREBASE_projectId,
        appId: FIREBASE_ENV.FIREBASE_appId,
        storageBucket: FIREBASE_ENV.FIREBASE_storageBucket,
        apiKey: FIREBASE_ENV.FIREBASE_apiKey,
        authDomain: FIREBASE_ENV.FIREBASE_authDomain,
        messagingSenderId: FIREBASE_ENV.FIREBASE_messagingSenderId,
        measurementId: FIREBASE_ENV.FIREBASE_measurementId,
      })
    ),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideAuth(() => getAuth()),
    provideHistoryRepository(),
    provideBrewingRepository(),
    provideRemoteBrewingRepository(),
  ],
};
