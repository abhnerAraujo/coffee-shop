import { isPlatformBrowser } from '@angular/common';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CalculatorHistoryComponent } from './calculator-history/calculator-history.component';
import { HISTORY_REPOSITORY, MemoryHistoryRepository } from './infra';
import { LocalStorageHistoryRepository } from './infra/local-storage-history.repository';

@NgModule({
  declarations: [CalculatorHistoryComponent],
  imports: [MatListModule, MatIconModule, MatButtonModule],
  providers: [
    {
      provide: HISTORY_REPOSITORY,
      useFactory: (platformId: object) => {
        if (isPlatformBrowser(platformId)) {
          return new LocalStorageHistoryRepository();
        } else {
          return new MemoryHistoryRepository();
        }
      },
      deps: [PLATFORM_ID],
    },
  ],
  exports: [CalculatorHistoryComponent],
})
export class HistoryModule {}
