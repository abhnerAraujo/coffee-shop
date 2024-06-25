import { InjectionToken } from '@angular/core';
import { BrewingRepository } from '../domain';
import { LocalStorageBrewingRepository } from './local-storage-brewing.repository';

export const BREWING_REPOSITORY = new InjectionToken<BrewingRepository>(
  'BrewingRepository'
);

export function provideBrewingRepository() {
  return {
    provide: BREWING_REPOSITORY,
    useFactory: () => {
      return new LocalStorageBrewingRepository();
    },
  };
}
