import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Brewing } from '@domain/brewing';
import { BrewService } from '@shared/services/brew.service';
import { map } from 'rxjs';

const MAT_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
];

@Component({
  selector: 'app-brews',
  standalone: true,
  imports: [...MAT_MODULES, DatePipe],
  templateUrl: './brews.component.html',
  styleUrl: './brews.component.scss',
})
export class BrewsComponent implements OnInit {
  protected list = signal<Array<Brewing>>([]);
  private destroyRef = inject(DestroyRef);
  constructor(private router: Router, private brewService: BrewService) {}

  ngOnInit(): void {
    this.brewService.listBrewings()
      .pipe(
        map(brewings => brewings.sort(
          (a, b) => b.getUpdatedAt().getTime() - a.getUpdatedAt().getTime()
        )),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(brewings => {
        this.list.set(brewings);
      });
  }

  newBrewing() {
    this.router.navigate(['/home'], { queryParams: { for: 'brew' } });
  }

  openBrew(brewing: Brewing) {
    this.router.navigate(['/brew/' + brewing.getId()]);
  }
}
