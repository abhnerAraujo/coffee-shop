import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CoffeeCalculatorComponent } from './coffee-calculator/coffee-calculator.component';
import { HistoryModule } from './features/history';

@Component({
  standalone: true,
  imports: [RouterModule, CoffeeCalculatorComponent, HistoryModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private analytics = inject(Analytics);
  title = 'Coffee Calculator';

  constructor(title: Title, @Inject(PLATFORM_ID) platformId: object) {
    if (isPlatformBrowser(platformId)) {
      logEvent(this.analytics, 'app loaded');
    }
    title.setTitle(this.title);
  }
}
