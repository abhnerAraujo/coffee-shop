import { isPlatformServer } from '@angular/common';
import {
  ApplicationConfig,
  PLATFORM_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  ScreenTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';
import {
  FirebaseApp,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideFirebaseApp((injector) => {
      console.log('platform', injector.get(PLATFORM_ID));
      if (isPlatformServer(injector.get(PLATFORM_ID))) {
        console.log(process.env['projectId']);
        return initializeApp({
          projectId: 'coffee-calculator-245be',
          appId: '1:416547090427:web:3f3081020e774db8f5255e',
          storageBucket: 'coffee-calculator-245be.appspot.com',
          apiKey: 'AIzaSyB7y9KfqAIAFPXTDo9VT7SnL-zITktgD64',
          authDomain: 'coffee-calculator-245be.firebaseapp.com',
          messagingSenderId: '416547090427',
          measurementId: 'G-PQ5W4B4PRM',
        });
      } else {
        return {} as FirebaseApp;
      }
    }),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
  ],
};
