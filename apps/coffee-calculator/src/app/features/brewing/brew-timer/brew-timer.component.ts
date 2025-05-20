import { AsyncPipe } from "@angular/common";
import { Component, HostBinding, Input, OnInit, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BrewStateService } from "@shared/services/brew-state.service";

@Component({
  selector: 'app-brew-timer',
  templateUrl: './brew-timer.component.html',
  styleUrls: ['./brew-timer.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, AsyncPipe],
})
export class BrewTimerComponent implements OnInit {
  @HostBinding('class.-fullscreen')
  @Input() fullscreen = false;
  protected timerStatus = signal<'paused' | 'counting' | 'stopped'>('stopped');
  protected timer = signal<string>('0:00');
  protected showTimer = signal(false);

  constructor(protected brewState: BrewStateService) {}

  ngOnInit() {
    this.brewState.timer$.subscribe(({ time, status, hidden }) => {
      this.timer.set(this.displayTime(time));
      this.timerStatus.set(status);
      this.showTimer.set(!hidden);
    });
  }
  
  protected displayTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
