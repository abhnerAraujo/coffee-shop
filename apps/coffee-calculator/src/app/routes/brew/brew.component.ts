import { Location } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ratioIntensityByMethod } from '@domain/ratio-intensity';
import { BrewStateService } from '@shared/services/brew-state.service';
import { BrewService } from '@shared/services/brew.service';
import { distinctUntilChanged, forkJoin, of } from 'rxjs';
import { BrewingModule, HistoryModule } from 'src/app/features';

const MAT_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
];

@Component({
  selector: 'app-brew',
  standalone: true,
  imports: [HistoryModule, BrewingModule, FormsModule, ...MAT_MODULES],
  templateUrl: './brew.component.html',
  styleUrl: './brew.component.scss',
})
export class BrewComponent implements OnInit {
  protected titleMode = signal<'edit' | 'view'>('view');
  protected suggestionName = signal<string>('');
  protected brewName = 'My brew';
  constructor(
    protected location: Location,
    private brewState: BrewStateService,
    private brewService: BrewService
  ) {
    this.brewState.process$
      .pipe(
        takeUntilDestroyed(),
        distinctUntilChanged((prev, next) => prev?.id === next?.id)
      )
      .subscribe(process => {
        if (!process) {
          forkJoin([
            this.brewService.getLastProcess(),
            of(this.brewService.frenchPress()),
          ]).subscribe(([last, frenchPress]) =>
            this.brewState.setProcess(last || frenchPress)
          );
        }
      });
  }

  ngOnInit() {
    this.suggestionName.set(this.suggestName());
  }

  protected handleInputBlur($event: FocusEvent) {
    const input = $event.target as HTMLInputElement;

    this.brewName = input.value;
    this.titleMode.set('view');
  }

  protected handlePromptSuggestion() {
    this.brewName = this.suggestionName();
    this.titleMode.set('view');
  }

  private suggestName() {
    const process = this.brewState.getProcess();

    if (process) {
      return `${ratioIntensityByMethod(process.ratio, process.method)} ${
        process.method
      }`.toLocaleUpperCase();
    }
    return 'MY BREW';
  }
}
