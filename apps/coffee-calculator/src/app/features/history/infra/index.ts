import { InjectionToken } from '@angular/core';
import { HistoryRepository } from '../domain';

export * from './memory-history.repository';

export const HISTORY_REPOSITORY = new InjectionToken<HistoryRepository>(
  'HistoryRepository'
);
