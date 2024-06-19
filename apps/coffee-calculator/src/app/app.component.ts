import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
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
