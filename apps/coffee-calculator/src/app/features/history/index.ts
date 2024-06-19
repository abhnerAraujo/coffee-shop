import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CalculatorHistoryComponent } from './calculator-history/calculator-history.component';
import { HISTORY_REPOSITORY, MemoryHistoryRepository } from './infra';

@NgModule({
  declarations: [CalculatorHistoryComponent],
  imports: [MatListModule, MatIconModule],
  providers: [
    {
      provide: HISTORY_REPOSITORY,
      useClass: MemoryHistoryRepository,
    },
  ],
  exports: [CalculatorHistoryComponent],
})
export class HistoryModule {}
