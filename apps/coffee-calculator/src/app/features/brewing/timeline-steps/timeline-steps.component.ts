import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, Inject, inject, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BrewStateService } from '@shared/services/brew-state.service';
import { debounceTime, delay, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { TimelineService } from '../services/timeline/timeline.service';

@Component({
  selector: 'app-timeline-steps',
  templateUrl: './timeline-steps.component.html',
  styleUrl: './timeline-steps.component.scss',
})
export class TimelineStepsComponent implements OnInit {
  @ViewChild('timelineSteps') timelineElement!: ElementRef<HTMLDivElement>;
  protected timeline = signal<Array<[string, string]>>([]);
  protected newStep = {
    time: '00:00',
    step: '',
  };
  protected addState = signal<'idle' | 'editing'>('idle');
  protected brewState = inject(BrewStateService);
  private timelineService = inject(TimelineService);
  private destroyRef = inject(DestroyRef);
  private userWheeled = false;

  constructor(@Inject(PLATFORM_ID) private platform: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {
      this.brewState.brewing$.subscribe(brewing => {
        if (brewing) {
          this.timeline.set(
            brewing.getTimeline().map(item => this.formatTimeline(item))
          );
        }
      });
      this.brewState.timer$.pipe(
        filter(() => !this.userWheeled),
        delay(1000),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(({fullscreen}) => {
        this.scrollToCurrentStep(fullscreen);
      });
      fromEvent(window, 'wheel').pipe(
        tap(() => this.userWheeled = true),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.userWheeled = false;
      });
    }
  }

  private scrollToCurrentStep(isFullscreen = false) {
    const currentStep = this.timeline().findIndex((_, i) => this.isCurrentStep(i));
    if (currentStep !== -1) {
      const timelineElement = this.timelineElement.nativeElement.children[currentStep];
      if (timelineElement) {
        timelineElement.scrollIntoView({
          behavior: 'smooth',
          block: isFullscreen ? 'center' : 'nearest',
          inline: isFullscreen ? 'center' : 'nearest',
        });
      }
    }
  }

  protected addStep() {
    const brewing = this.brewState.getBrewing();
    if (brewing) {
      this.timelineService.addTimelineItem(
        brewing,
        [this.convertTime(this.newStep.time), this.newStep.step]
      );
      this.newStep.time = '00:00';
      this.newStep.step = '';
      this.addState.set('idle');
    }
  }

  protected handleDelete(index: number) {
    const brewing = this.brewState.getBrewing();
    if (brewing) {
      this.timelineService.deleteTimelineItem(brewing, index);
    }
  }

  protected handleAdd() {
    const {time} = this.brewState.timer.value;
    this.newStep.time = this.formatSeconds(time);
    this.addState.set('editing');
  }

  protected handleClose() {
    this.addState.set('idle');
    this.newStep.time = '00:00';
    this.newStep.step = '';
  }

  protected isCurrentStep(index: number) {
    const {time, hidden} = this.brewState.timer.value;
    if (hidden) {
      return false;
    }
    if (index === 0) {
      return time >= this.convertTime(this.timeline()[index][0])
        && (!this.timeline()[index+1] || time < this.convertTime(this.timeline()[index + 1][0]));
    } else if (index === this.timeline().length - 1) {
      return this.convertTime(this.timeline()[index][0]) >= time
        && (!this.timeline()[index-1] || time > this.convertTime(this.timeline()[index - 1][0]));
    }

    const nextStep = this.timeline()[index + 1];
    const previousStep = this.timeline()[index - 1];
    return this.convertTime(previousStep[0]) < time && this.convertTime(nextStep[0]) > time;
  }

  private convertTime(time: string) {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  private formatTimeline(item: [number, string]) {
    return [this.formatSeconds(item[0]), item[1]] as [string, string];
  }

  private formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
} 