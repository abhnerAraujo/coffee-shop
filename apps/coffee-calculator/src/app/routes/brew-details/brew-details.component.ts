import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, isPlatformServer, NgClass } from '@angular/common';
import { Component, DestroyRef, Inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';
import { BrewStateService } from '@shared/services/brew-state.service';
import { BrewService } from '@shared/services/brew.service';
import { distinctUntilChanged, forkJoin, fromEvent, map, of } from 'rxjs';
import { BrewingModule, HistoryModule } from 'src/app/features';

const MAT_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDividerModule,
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
    AsyncPipe,
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
  protected stickyHeader = signal(false);
  protected isMediumLayout = signal(false);
  private readonly SCROLL_THRESHOLD = 172;
  @Input() brewingId = '';
  constructor(
    protected brewState: BrewStateService,
    private brewService: BrewService,
    private router: Router,
    private layoutChanges: BreakpointObserver,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    if (isPlatformServer(platformId)) {
      return;
    }
    const mediumBreakpoint = '(min-width: 768px)';
    this.layoutChanges.observe([mediumBreakpoint]).subscribe(result => {
      this.isMediumLayout.set(result.matches);
    });
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
    fromEvent(window, 'scroll').pipe(
      takeUntilDestroyed(),
      distinctUntilChanged(),
      map(() => window.scrollY > this.SCROLL_THRESHOLD)
    ).subscribe(sticky => this.stickyHeader.set(sticky));
  }

  ngOnInit() {
    this.brewService.getBrewing(this.brewingId).then(brewing => {
      if (brewing) {
        this.brewState.setBrewing(brewing);
      }
    });
    this.brewState.brewing$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(brewing => {
      if (brewing) {
        this.brewName.set(brewing.getName());
        this.suggestionName.set(this.brewService.suggestName(brewing.getMethodProcess()));
      }
    });
  }

  protected handleInputBlur($event: FocusEvent) {
    const input = $event.target as HTMLInputElement;
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      console.log(input.value.trim());
      brewing.setName(
        !input.value.trim() ? this.suggestionName() : input.value.trim()
      );
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

  handleTimerVisibility() {
    this.brewState.toggleTimerVisibility();
    setTimeout(() => {
      document.getElementById('timer-timeline-container')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }, 100);
  }
}
