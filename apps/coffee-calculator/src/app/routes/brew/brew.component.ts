import { Location } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ratioIntensityByMethod } from '@domain/ratio-intensity';
import { BrewStateService } from '@shared/services/brew-state.service';
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
    private brewService: BrewStateService
  ) {}

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
    const process = this.brewService.getProcess();

    if (process) {
      return `${ratioIntensityByMethod(process.ratio, process.method)} ${
        process.method
      }`.toLocaleUpperCase();
    }
    return 'MY BREW';
  }
}
