import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { combineLatest } from 'rxjs';

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
    {
      title: 'User',
      url: '/user',
      icon: 'person',
    },
  ];
  protected showNav = signal<boolean>(true);
  private analytics = inject(Analytics);
  title = 'Coffee Calculator';

  constructor(
    title: Title,
    @Inject(PLATFORM_ID) platformId: object,
    private activatedRoute: ActivatedRoute
  ) {
    if (isPlatformBrowser(platformId)) {
      logEvent(this.analytics, 'app loaded');
      this.handleNavBar();
    }
    title.setTitle(this.title);
  }

  private handleNavBar() {
    combineLatest([
      this.activatedRoute.url,
      this.activatedRoute.queryParams,
    ]).subscribe(([url, query]) => {
      if (
        (url[0].path === 'home' || url[0].path === '') &&
        query['for'] === 'brew'
      ) {
        this.showNav.set(false);
      } else {
        this.showNav.set(true);
      }
    });
  }
}
