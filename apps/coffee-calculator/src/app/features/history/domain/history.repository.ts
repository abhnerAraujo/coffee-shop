import { MethodProcess } from '@domain/method-process';

export interface HistoryRepository {
  saveProcess(process: MethodProcess): Promise<void>;
  getHistory(): Promise<MethodProcess[]>;
  deleteProcess(process: MethodProcess): Promise<void>;
  clearHistory(): Promise<void>;
  saveDraft(draft: MethodProcess): Promise<void>;
  addLastDraftIntoHistory(): Promise<void>;
}
