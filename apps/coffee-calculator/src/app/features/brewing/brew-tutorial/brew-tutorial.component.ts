import { BreakpointObserver } from "@angular/cdk/layout";
import { isPlatformBrowser } from "@angular/common";
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { BrewStateService } from "@shared/services/brew-state.service";
import { combineLatest } from "rxjs";

@Component({
  selector: 'app-brew-tutorial',
  templateUrl: './brew-tutorial.component.html',
  styleUrls: ['./brew-tutorial.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule]
})
export class BrewTutorialComponent implements OnInit {
  safeUrl = signal<SafeUrl>('');
  isMediumLayout = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  constructor(
    private sanitizer: DomSanitizer,
    private brewState: BrewStateService,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) platformId: object,
    private layoutChanges: BreakpointObserver
  ) {
    if (isPlatformBrowser(platformId)) {
      const mediumBreakpoint = '(min-width: 768px)';

      this.layoutChanges.observe([mediumBreakpoint]).subscribe(result => {
        this.isMediumLayout.set(result.matches);
      });
    }
  }

  ngOnInit() {
    combineLatest([this.brewState.brewing$, this.brewState.editing$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([brewing, editing]) => {
        this.isEditing.set(editing);
        if (brewing) {
          this.safeUrl.set(editing
            ? brewing.getTutorial()
            : this.sanitizer.bypassSecurityTrustResourceUrl(
              brewing.getTutorial()
            )
          );
        } else {
          this.safeUrl.set('');
        }
      });
  }

  protected handleSaveTutorial(value: string) {
    const brewing = this.brewState.getBrewing();
    if (brewing) {
      brewing.setTutorial(value);
    }
  }
}
