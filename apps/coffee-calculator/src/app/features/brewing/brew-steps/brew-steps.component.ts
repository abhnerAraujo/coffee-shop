import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MethodType } from '@domain/method';
import { stepsByMethodProcess } from '@domain/steps';
import { BrewStateService } from '@shared/services/brew-state.service';

@Component({
  selector: 'app-brew-steps',
  templateUrl: './brew-steps.component.html',
  styleUrl: './brew-steps.component.scss',
})
export class BrewStepsComponent implements OnInit {
  pre = signal<string[]>([]);
  steps = signal<string[]>([]);
  tutorialUrl = signal<SafeUrl>('');
  tips = signal<string[]>([]);
  private readonly tutorials: { [key in MethodType]: SafeUrl };
  protected isMediumLayout = signal<boolean>(false);
  constructor(
    private brewService: BrewStateService,
    sanitizer: DomSanitizer,
    private layoutChanges: BreakpointObserver,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.tutorials = {
      'French Press': sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/w3A_Z1J78HY?si=rpAMPe7OyTTxV3Yt'
      ),
      Chemex: sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/JrcH-4wHK9w?si=Jx5jHbHksRKb540t'
      ),
      AeroPress: sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/tRIX9G7D_9Q?si=BHu3L0awvqgLWj7Q'
      ),
      V60: sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/YVYbcEatZ5s?si=qPTOvzk1fzakYgU4'
      ),
      'Moka Pot': sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/zzlFOkD4Kz4?si=0kvvzthmhUwM0I3M'
      ),
    };
    if (isPlatformBrowser(platformId)) {
      const mediumBreakpoint = '(min-width: 768px)';

      this.layoutChanges.observe([mediumBreakpoint]).subscribe(result => {
        this.isMediumLayout.set(result.matches);
      });
    }
  }

  ngOnInit() {
    this.brewService.process$.subscribe(currentProcess => {
      if (currentProcess) {
        const [pre, steps, tips] = stepsByMethodProcess(currentProcess);

        this.pre.set(pre);
        this.steps.set(steps);
        this.tips.set(tips);
        this.tutorialUrl.set(this.tutorials[currentProcess.method]);
      } else {
        this.pre.set([]);
        this.steps.set([]);
        this.tutorialUrl.set('');
      }
    });
  }
}
