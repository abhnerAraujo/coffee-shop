import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CoffeeCalculatorComponent, HistoryModule } from 'src/app/features';
import { HistoryRepository } from 'src/app/features/history/domain';
import { HISTORY_REPOSITORY } from 'src/app/features/history/infra';

const MAT_MODULES = [MatButtonModule];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoffeeCalculatorComponent, HistoryModule, ...MAT_MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    @Inject(HISTORY_REPOSITORY) private historyRepo: HistoryRepository
  ) {}

  protected handleSaveInHistory() {
    this.historyRepo.addLastDraftIntoHistory();
  }
}
