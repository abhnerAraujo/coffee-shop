import { DraftMethodProcess, MethodProcess } from '@domain/method-process';
import { HistoryRepository } from '../domain';

export class MemoryHistoryRepository implements HistoryRepository {
  private history: MethodProcess[] = [];
  private drafts: DraftMethodProcess[] = [];

  async saveProcess(process: MethodProcess) {
    this.history.push(process);
  }
  async getHistory() {
    return this.history;
  }
  async deleteProcess(process: MethodProcess) {
    this.history = this.history.filter(
      p => p.createdAt.getTime() !== process.createdAt.getTime()
    );
  }
  async clearHistory() {
    this.history = [];
  }
  async saveDraft(draft: DraftMethodProcess) {
    this.drafts.push(draft);
  }

  async getLastDraft() {
    return this.drafts.pop();
  }

  clearDrafts() {
    this.drafts = [];
    return Promise.resolve();
  }
}
