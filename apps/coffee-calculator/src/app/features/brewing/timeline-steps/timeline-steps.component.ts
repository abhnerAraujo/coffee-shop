import { Component, inject, OnInit, signal } from '@angular/core';
import { BrewStateService } from '@shared/services/brew-state.service';
import { TimelineService } from '../services/timeline/timeline.service';

@Component({
  selector: 'app-timeline-steps',
  templateUrl: './timeline-steps.component.html',
  styleUrl: './timeline-steps.component.scss',
})
export class TimelineStepsComponent implements OnInit {
  protected timeline = signal<Array<[string, string]>>([]);
  protected newStep = {
    time: '00:00',
    step: '',
  };
  protected addState = signal<'idle' | 'editing'>('idle');
  protected brewState = inject(BrewStateService);
  private timelineService = inject(TimelineService);

  ngOnInit() {
    this.brewState.brewing$.subscribe(brewing => {
      if (brewing) {
        this.timeline.set(
          brewing.getTimeline().map(item => this.formatTimeline(item))
        );
      }
    });
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