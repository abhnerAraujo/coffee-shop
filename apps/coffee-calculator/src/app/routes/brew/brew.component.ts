import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HistoryModule } from 'src/app/features';
import { BrewingModule } from 'src/app/features/brewing';

@Component({
  selector: 'app-brew',
  standalone: true,
  imports: [HistoryModule, BrewingModule, MatIconModule, MatButtonModule],
  templateUrl: './brew.component.html',
  styleUrl: './brew.component.scss',
})
export class BrewComponent {
  constructor(protected location: Location) {}
}
