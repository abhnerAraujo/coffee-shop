import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  WritableSignal,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Brewing } from '@domain/brewing';
import { MethodType } from '@domain/method';
import { BrewStateService } from '@shared/services/brew-state.service';
import { BrewService } from '@shared/services/brew.service';

@Component({
  selector: 'app-brew-steps',
  templateUrl: './brew-steps.component.html',
  styleUrl: './brew-steps.component.scss',
})
export class BrewStepsComponent implements OnInit {
  pre = signal<{ mode: 'edit' | 'view'; value: string }[]>([]);
  steps = signal<{ mode: 'edit' | 'view'; value: string }[]>([]);
  tutorialUrl = signal<SafeUrl>('');
  tips = signal<{ mode: 'edit' | 'view'; value: string }[]>([]);
  listTabs = signal<{ label: string; list: ListSignal }[]>([]);
  private readonly tutorials: { [key in MethodType]: SafeUrl };
  protected addState = signal<number | undefined>(undefined);
  protected isMediumLayout = signal<boolean>(false);
  protected isEditing = signal(false);
  constructor(
    private brewState: BrewStateService,
    private brewService: BrewService,
    sanitizer: DomSanitizer,
    private layoutChanges: BreakpointObserver,
    @Inject(PLATFORM_ID) platformId: object,
    private destroyRef: DestroyRef
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
    this.listTabs.set([
      { label: 'Get Ready', list: this.pre },
      { label: 'Steps', list: this.steps },
      { label: 'Pro Tips', list: this.tips },
    ]);
    if (isPlatformBrowser(platformId)) {
      const mediumBreakpoint = '(min-width: 768px)';

      this.layoutChanges.observe([mediumBreakpoint]).subscribe(result => {
        this.isMediumLayout.set(result.matches);
      });
      brewState.editing$
        .pipe(takeUntilDestroyed())
        .subscribe(editing => this.isEditing.set(editing));
    }
  }

  ngOnInit() {
    this.brewState.brewing$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(brewing => this.updateBrewing(brewing));
  }

  private updateBrewing(brewing: Brewing | undefined) {
    if (brewing) {
      this.pre.set(
        brewing.getPreparation().map(value => ({ mode: 'view', value }))
      );
      this.steps.set(
        brewing.getSteps().map(value => ({ mode: 'view', value }))
      );
      this.tips.set(brewing.getTips().map(value => ({ mode: 'view', value })));
      this.tutorialUrl.set(this.tutorials[brewing.getMethodProcess().method]);
      this.addState.set(undefined);
    } else {
      this.pre.set([]);
      this.steps.set([]);
      this.tips.set([]);
      this.tutorialUrl.set('');
      this.addState.set(undefined);
    }
  }

  protected handleEdit(list: ListSignal, index: number) {
    if (!this.isEditing()) return;
    const current = list();
    const item = current[index];

    list.set([
      ...current.slice(0, index),
      { ...item, mode: 'edit' },
      ...current.slice(index + 1),
    ]);
  }

  protected handleSaveStep(list: number, index: number, value: string) {
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      switch (list) {
        case 0:
          this.savePreparation(brewing, index, value);
          break;
        case 1:
          this.saveSteps(brewing, index, value);
          break;
        case 2:
          this.saveTips(brewing, index, value);
          break;
      }
      this.addState.set(undefined);
      this.brewService.updateBrewing(brewing);
      this.brewState.setBrewing(brewing);
    }
  }

  private savePreparation(brewing: Brewing, index: number, value: string) {
    const current = brewing.getPreparation();

    brewing.setPreparation([
      ...current.slice(0, index),
      value,
      ...current.slice(index + 1),
    ]);
  }

  private saveSteps(brewing: Brewing, index: number, value: string) {
    const current = brewing.getSteps();

    brewing.setSteps([
      ...current.slice(0, index),
      value,
      ...current.slice(index + 1),
    ]);
  }

  private saveTips(brewing: Brewing, index: number, value: string) {
    const current = brewing.getTips();

    brewing.setTips([
      ...current.slice(0, index),
      value,
      ...current.slice(index + 1),
    ]);
  }

  handleNewStep(list: ListSignal, value: string) {
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      brewing.setSteps([...list().map(({ value }) => value), value]);
      this.brewService.updateBrewing(brewing);
    }
  }

  protected handleCancelStep(list: ListSignal, index: number) {
    const current = list();
    const item = current[index];

    list.set([
      ...current.slice(0, index),
      { ...item, mode: 'view' },
      ...current.slice(index + 1),
    ]);
  }

  protected swapSteps(list: number, from: number, to: number) {
    const brewing = this.brewState.getBrewing();
    const swap = (steps: string[], setFunction: (steps: string[]) => void) => {
      const temp = steps[from];

      steps[from] = steps[to];
      steps[to] = temp;
      setFunction(steps);
    };

    if (brewing) {
      switch (list) {
        case 0:
          swap(brewing.getPreparation(), steps =>
            brewing.setPreparation(steps)
          );
          break;
        case 1:
          swap(brewing.getSteps(), steps => brewing.setSteps(steps));
          break;
        case 2:
          swap(brewing.getTips(), steps => brewing.setTips(steps));
          break;
      }
      this.brewService.updateBrewing(brewing);
      this.brewState.setBrewing(brewing);
    }
  }

  protected handleRemoveStep(list: number, index: number) {
    const brewing = this.brewState.getBrewing();

    if (brewing) {
      switch (list) {
        case 0:
          brewing.setPreparation(
            brewing.getPreparation().filter((_, i) => i !== index)
          );
          break;
        case 1:
          brewing.setSteps(brewing.getSteps().filter((_, i) => i !== index));
          break;
        case 2:
          brewing.setTips(brewing.getTips().filter((_, i) => i !== index));
          break;
      }
      this.brewService.updateBrewing(brewing);
      this.brewState.setBrewing(brewing);
    }
  }
}

type ListSignal = WritableSignal<{ mode: 'edit' | 'view'; value: string }[]>;
