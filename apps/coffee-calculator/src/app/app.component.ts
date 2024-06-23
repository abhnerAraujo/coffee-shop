import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected nav = [
    {
      title: 'Calculator',
      url: '/home',
      icon: 'calculate',
    },
    {
      title: 'Brew',
      url: '/brew',
      icon: 'coffee_maker',
    },
  ];
  private analytics = inject(Analytics);
  title = 'Coffee Calculator';

  constructor(title: Title, @Inject(PLATFORM_ID) platformId: object) {
    if (isPlatformBrowser(platformId)) {
      logEvent(this.analytics, 'app loaded');
    }
    title.setTitle(this.title);
  }
}
