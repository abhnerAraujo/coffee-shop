import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID } from '@angular/core';
import { BrewingRepository } from '../domain';
import { LocalStorageBrewingRepository } from './local-storage-brewing.repository';
import { MemoryBrewingRepository } from './memory-brewing.repository';

export const BREWING_REPOSITORY = new InjectionToken<BrewingRepository>(
  'BrewingRepository'
);

export function provideBrewingRepository() {
  return {
    provide: BREWING_REPOSITORY,
    useFactory: (platform: object) => {
      return isPlatformBrowser(platform)
        ? new LocalStorageBrewingRepository()
        : new MemoryBrewingRepository();
    },
    deps: [PLATFORM_ID],
  };
}
