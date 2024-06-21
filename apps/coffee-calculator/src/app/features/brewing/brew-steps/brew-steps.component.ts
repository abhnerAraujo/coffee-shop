import { Component, signal } from '@angular/core';
import { stepsByMethodProcess } from '@domain/steps';
import { BrewStateService } from '@shared/services/brew-state.service';

@Component({
  selector: 'app-brew-steps',
  templateUrl: './brew-steps.component.html',
  styleUrl: './brew-steps.component.scss',
})
export class BrewStepsComponent {
  pre = signal<string[]>([]);
  steps = signal<string[]>([]);
  constructor(private brewService: BrewStateService) {
    this.brewService.process$.subscribe(currentProcess => {
      if (currentProcess) {
        const [pre, steps] = stepsByMethodProcess(currentProcess);

        this.pre.set(pre);
        this.steps.set(steps);
      } else {
        this.pre.set([]);
        this.steps.set([]);
      }
    });
  }
}
