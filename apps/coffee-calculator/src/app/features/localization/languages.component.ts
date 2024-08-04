import { Component, inject, signal } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
})
export class LanguagesComponent {
  protected languages = signal([
    { code: Language.EN, label: $localize`:@@english:English` },
    { code: Language.PT, label: $localize`:@@portuguese:Português` },
  ]);
  private analytics = inject(Analytics);

  protected changeLanguage(lang: string) {
    logEvent(this.analytics, 'language change', { lang });
    switch (lang) {
      case Language.PT:
        window.location.href = PT_URL;
        break;
      case Language.EN:
        window.location.href = EN_URL;
        break;
      default:
        window.location.href = EN_URL;
    }
  }
}

enum Language {
  PT = 'pt',
  EN = 'en',
}

