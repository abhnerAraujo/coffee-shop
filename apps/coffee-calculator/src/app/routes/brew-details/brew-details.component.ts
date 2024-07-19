import { NgClass } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';
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
  selector: 'app-brew-details',
  standalone: true,
  imports: [
    HistoryModule,
    BrewingModule,
    FormsModule,
    AutoFocusDirective,
    NgClass,
    ...MAT_MODULES,
  ],
  templateUrl: './brew-details.component.html',
  styleUrl: './brew-details.component.scss',
})
export class BrewDetailsComponent implements OnInit {
  protected titleMode = signal<'edit' | 'view'>('view');
  protected suggestionName = signal<string>('');
  protected brewName = signal('My brew');
  protected isEditing = signal(false);
  @Input() brewingId = '';
  constructor(
    protected brewState: BrewStateService,
    private brewService: BrewService,
    private router: Router
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
    brewState.editing$
      .pipe(takeUntilDestroyed())
      .subscribe(editing => this.isEditing.set(editing));
  }

  ngOnInit() {
    this.brewService.getBrewing(this.brewingId).then(brewing => {
      if (brewing) {
        this.brewState.setBrewing(brewing);
        this.brewName.set(brewing.getName());
        this.suggestionName.set(brewing.getName());
      }
    });
  }

  protected handleInputBlur($event: FocusEvent) {
    const input = $event.target as HTMLInputElement;
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      brewing.setName(
        !input.value.trim() ? this.suggestionName() : input.value.trim()
      );
      this.brewService.updateBrewing(brewing);
      this.brewName.set(brewing.getName());
    }
    this.titleMode.set('view');
  }

  protected handlePromptSuggestion() {
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      brewing.setName(this.brewService.suggestName(brewing.getMethodProcess()));
      this.brewName.set(this.suggestionName());
    }
    this.titleMode.set('view');
  }

  protected handleBackClick() {
    this.router.navigate(['/brew']);
  }
}
