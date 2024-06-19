import { MethodProcess } from '@domain/method-process';
import { HistoryRepository } from '../domain';

export class MemoryHistoryRepository implements HistoryRepository {
  private history: MethodProcess[] = [];
  async saveProcess(process: MethodProcess) {
    this.history.push(process);
  }
  async getHistory() {
    return this.history;
  }
  async deleteProcess(process: MethodProcess) {
    this.history = this.history.filter(
      (p) => p.createdAt.getTime() !== process.createdAt.getTime()
    );
  }
  async clearHistory() {
    this.history = [];
  }
}
