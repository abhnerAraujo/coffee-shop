import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, PLATFORM_ID } from '@angular/core';
import { HistoryRepository } from '../domain';
import { LocalStorageHistoryRepository } from './local-storage-history.repository';
import { MemoryHistoryRepository } from './memory-history.repository';

export * from './memory-history.repository';

export const HISTORY_REPOSITORY = new InjectionToken<HistoryRepository>(
  'HistoryRepository'
);

export function provideHistoryRepository() {
  return {
    provide: HISTORY_REPOSITORY,
    useFactory: (platformId: object) => {
      if (isPlatformBrowser(platformId)) {
        return new LocalStorageHistoryRepository();
      } else {
        return new MemoryHistoryRepository();
      }
    },
    deps: [PLATFORM_ID],
  };
}
