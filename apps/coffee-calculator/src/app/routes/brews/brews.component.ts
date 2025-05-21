import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Brewing } from '@domain/brewing';
import { AppStateService } from '@shared/services/app-state.service';
import { BrewService } from '@shared/services/brew.service';

const MAT_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatProgressSpinnerModule,
];

@Component({
  selector: 'app-brews',
  standalone: true,
  imports: [...MAT_MODULES],
  templateUrl: './brews.component.html',
  styleUrl: './brews.component.scss',
})
export class BrewsComponent implements OnInit {
  private appState = inject(AppStateService);
  private brewService = inject(BrewService);
  protected list = toSignal(this.brewService.listBrewings(), { initialValue: [] });
  protected syncing = toSignal(this.appState.syncing$);
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.list()
  }

  newBrewing() {
    this.router.navigate(['/home'], { queryParams: { for: 'brew' } });
  }

  openBrew(brewing: Brewing) {
    this.router.navigate(['/brew/' + brewing.getId()]);
  }
}
