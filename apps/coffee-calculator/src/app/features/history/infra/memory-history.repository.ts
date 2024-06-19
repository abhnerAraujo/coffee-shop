import { MethodProcess } from '@domain/method-process';
import { HistoryRepository } from '../domain';

export class MemoryHistoryRepository implements HistoryRepository {
  private history: MethodProcess[] = [];
  private drafts: MethodProcess[] = [];

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
  async saveDraft(draft: MethodProcess) {
    this.drafts.push(draft);
  }
  async addLastDraftIntoHistory() {
    const draft = this.drafts.pop();
    if (draft) {
      this.history.push(draft);
    }
  }
}
