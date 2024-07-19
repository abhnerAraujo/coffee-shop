import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MethodProcess } from '@domain/method-process';
import { BrewStateService } from '@shared/services/brew-state.service';
import { BrewService } from '@shared/services/brew.service';
import { from, mergeMap, of } from 'rxjs';
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
export class HomeComponent implements OnDestroy {
  protected mode = signal<'brew' | 'calculator'>('calculator');
  protected test = $localize`Teste`;
  constructor(
    @Inject(HISTORY_REPOSITORY) private historyRepo: HistoryRepository,
    private brewState: BrewStateService,
    private brewService: BrewService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    const mode = this.activatedRoute.snapshot.queryParams['for'];

    if (mode) {
      this.mode.set(mode);
    }
  }

  protected handleSaveInHistory() {
    this.saveLastDraft().subscribe(process => {
      this.brewState.setProcess(process);
    });
  }

  protected handleStartBrew() {
    const process = this.brewState.getProcess();

    if (process) {
      this.router.navigate(['/brew']);
    } else {
      this.saveLastDraft().subscribe(process => {
        if (process) {
          this.brewState.setProcess(process);
          this.router.navigate(['/brew']);
        }
      });
    }
  }

  protected handleProcessSelect(process: MethodProcess) {
    this.brewState.setProcess(process);
    this.router.navigate(['/brew']);
  }

  private saveLastDraft() {
    return from(this.historyRepo.getLastDraft()).pipe(
      mergeMap(draft =>
        draft ? this.historyRepo.saveProcess(draft.convert()) : of(undefined)
      )
    );
  }

  protected handleConfirmSelection() {
    this.saveLastDraft().subscribe(process => {
      if (process) {
        const brewing = this.brewService.startNewBrewing(process);

        this.brewState.setBrewing(brewing);
        this.router.navigate([`brew/${brewing.getId()}`]);
      }
    });
  }

  ngOnDestroy(): void {
    this.historyRepo.clearDrafts();
  }
}
