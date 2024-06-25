import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Brewing } from '@domain/brewing';
import { BrewService } from '@shared/services/brew.service';

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
  imports: [...MAT_MODULES],
  templateUrl: './brews.component.html',
  styleUrl: './brews.component.scss',
})
export class BrewsComponent implements OnInit {
  protected list = signal<Array<Brewing>>([]);
  constructor(private router: Router, private brewService: BrewService) {}

  ngOnInit(): void {
    this.brewService.listBrewings().subscribe(brewings => {
      this.list.set(brewings);
    });
  }

  newBrewing() {
    this.router.navigate(['/home'], { queryParams: { for: 'brew' } });
  }
}
