import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CalculatorHistoryComponent } from './calculator-history/calculator-history.component';

@NgModule({
  declarations: [CalculatorHistoryComponent],
  imports: [MatListModule, MatIconModule, MatButtonModule],
  exports: [CalculatorHistoryComponent],
})
export class HistoryModule {}
