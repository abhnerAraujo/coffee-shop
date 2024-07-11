import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID } from '@angular/core';
import { BrewingRepository } from '../domain';
import { FirestoreBrewingRepository } from './firestore-brewing.repository';
import { LocalStorageBrewingRepository } from './local-storage-brewing.repository';
import { MemoryBrewingRepository } from './memory-brewing.repository';

export const BREWING_REPOSITORY = new InjectionToken<BrewingRepository>(
  'BrewingRepository'
);

export const REMOTE_BREWING_REPOSITORY = new InjectionToken<BrewingRepository>(
  'RemoteBrewingRepository'
);

export function provideRemoteBrewingRepository() {
  return {
    provide: REMOTE_BREWING_REPOSITORY,
    useClass: FirestoreBrewingRepository,
    deps: [PLATFORM_ID],
  };
}

export function provideBrewingRepository() {
  return {
    provide: BREWING_REPOSITORY,
    useFactory: (platform: object) => {
      console.log('provideBrewingRepository');
      return isPlatformBrowser(platform)
        ? new LocalStorageBrewingRepository()
        : new MemoryBrewingRepository();
    },
    deps: [PLATFORM_ID],
  };
}
