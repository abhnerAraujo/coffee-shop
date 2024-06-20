import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { MethodProcess } from '@domain/method-process';
import { delay, from, mergeMap } from 'rxjs';
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
  @Output() protected processSelected = new EventEmitter<MethodProcess>();
  constructor(
    @Inject(HISTORY_REPOSITORY) private historyRepository: HistoryRepository,
    @Inject(PLATFORM_ID) private platformId: object,
    private afterHistoryChangedService: AfterHistoryChangedService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.afterHistoryChangedService.historyUpdated$
        .pipe(
          delay(1000),
          mergeMap(() => this.historyRepository.getHistory())
        )
        .subscribe(this.history.set);
      from(this.historyRepository.getHistory()).subscribe(this.history.set);
    }
  }

  clearHistory() {
    from(this.historyRepository.clearHistory())
      .pipe(mergeMap(() => this.historyRepository.getHistory()))
      .subscribe(this.history.set);
  }
}
