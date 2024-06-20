import { DraftMethodProcess, MethodProcess } from '@domain/method-process';

export interface HistoryRepository {
  saveProcess(process: MethodProcess): Promise<MethodProcess>;
  getHistory(): Promise<MethodProcess[]>;
  deleteProcess(process: MethodProcess): Promise<void>;
  clearHistory(): Promise<void>;
  clearDrafts(): Promise<void>;
  saveDraft(draft: DraftMethodProcess): Promise<void>;
  getLastDraft(): Promise<DraftMethodProcess | undefined>;
}
