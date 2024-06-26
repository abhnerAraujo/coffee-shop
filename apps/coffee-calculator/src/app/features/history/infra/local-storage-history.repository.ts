import { DraftMethodProcess, MethodProcess } from '@domain/method-process';
import { HistoryRepository } from '../domain';

export class LocalStorageHistoryRepository implements HistoryRepository {
  private readonly historyKey: string;
  private readonly draftKey: string;
  constructor() {
    this.historyKey = 'history';
    this.draftKey = 'draft';
  }
  async saveProcess(process: MethodProcess): Promise<MethodProcess> {
    const history = await this.getHistory();

    history.unshift(process);
    localStorage.setItem(this.historyKey, JSON.stringify(history));
    return process;
  }
  getHistory(): Promise<MethodProcess[]> {
    const history = localStorage.getItem(this.historyKey);

    if (!history) return Promise.resolve([]);
    return Promise.resolve(JSON.parse(history));
  }
  async deleteProcess(process: MethodProcess): Promise<void> {
    const history = await this.getHistory();
    const newHistory = history.filter(p => p.id !== process.id);

    localStorage.setItem(this.historyKey, JSON.stringify(newHistory));
  }
  clearHistory(): Promise<void> {
    localStorage.removeItem(this.historyKey);
    return Promise.resolve();
  }
  saveDraft(draft: MethodProcess): Promise<void> {
    const drafts = localStorage.getItem(this.draftKey);

    if (!drafts) {
      localStorage.setItem(this.draftKey, JSON.stringify([draft]));
      return Promise.resolve();
    }
    localStorage.setItem(
      this.draftKey,
      JSON.stringify([...JSON.parse(drafts), draft])
    );
    return Promise.resolve();
  }
  clearDrafts(): Promise<void> {
    localStorage.removeItem(this.draftKey);
    return Promise.resolve();
  }
  async getLastDraft(): Promise<DraftMethodProcess | undefined> {
    const drafts = localStorage.getItem(this.draftKey);

    if (!drafts) return Promise.resolve(undefined);
    const draft = JSON.parse(drafts).pop();

    return Promise.resolve(
      MethodProcess.builder()
        .withId(draft.id)
        .withMethod(draft.method)
        .withCreatedAt(draft.createdAt)
        .withRatio(draft.ratio)
        .withUnits(draft.units)
        .withCups(draft.cups)
        .withQuantities(draft.quantities)
        .draft()
    );
  }
}
