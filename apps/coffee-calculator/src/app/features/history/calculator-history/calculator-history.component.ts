import { Component, Inject, OnInit, signal } from '@angular/core';
import { MethodProcess } from '@domain/method-process';
import { mergeMap } from 'rxjs';
import { HistoryRepository } from '../domain';
import { HISTORY_REPOSITORY } from '../infra';
import { AfterHistoryChangedService } from '../services';

@Component({
  selector: 'app-calculator-history',
  templateUrl: './calculator-history.component.html',
  styleUrl: './calculator-history.component.scss',
})
export class CalculatorHistoryComponent implements OnInit {
  history = signal<Array<MethodProcess>>([]);
  constructor(
    @Inject(HISTORY_REPOSITORY) private historyRepository: HistoryRepository,
    private afterHistoryChangedService: AfterHistoryChangedService
  ) {}

  ngOnInit() {
    this.afterHistoryChangedService.historyUpdated$
      .pipe(mergeMap(() => this.historyRepository.getHistory()))
      .subscribe(history => {
        this.history.set(history);
      });
    this.historyRepository.getHistory().then(history => {
      this.history.set(history);
    });
  }
}
