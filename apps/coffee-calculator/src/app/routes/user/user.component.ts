import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { getAuth, GoogleAuthProvider } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { signInWithCredential } from '@firebase/auth';
import { AppStateService } from '@shared/services/app-state.service';
import { BrewService } from '@shared/services/brew.service';
import { LanguagesComponent } from 'src/app/features/localization/languages.component';

const MAT_MODULES = [MatButtonModule, MatDividerModule];

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, LanguagesComponent, ...MAT_MODULES],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements AfterViewInit {
  protected user = signal<{ picture: string; name: string } | null>(null);
  private analytics = inject(Analytics);
  protected promptTimeout: NodeJS.Timeout | undefined;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private appState: AppStateService,
    private brewService: BrewService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.appState.user$.subscribe(user => {
      this.handleUser(user);
    });
  }

  private handleUser(user: { name: string; picture: string } | null) {
    if (!user) {
      this.handleGoogleSignIn();
      this.user.set(null);
    } else {
      clearTimeout(this.promptTimeout);
      this.user.set({
        ...user,
      });
      this.brewService.listBrewings().subscribe(brewings => {
        console.log(brewings);
      });
    }
  }

  private handleGoogleSignIn() {
    const handleCredentialResponse = (response: { credential: string }) => {
      const credential = GoogleAuthProvider.credential(response.credential);
      signInWithCredential(getAuth(), credential).catch(error => {
        console.error(error);
        google.accounts.id.cancel();
      });
    };
    google.accounts.id.initialize({
      client_id:
        '416547090427-g6dslunn5v7qjnk7q7ivd6q9596v8dcp.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    setTimeout(() => {
      google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        {
          theme: 'filled_black',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          logo_alignment: 'left',
        } // customization attributes
      );
    }, 550);
    this.promptTimeout = setTimeout(() => {
      google.accounts.id.prompt(); // also display the One Tap dialog
    }, 5000);
  }

  protected handleSignout() {
    logEvent(this.analytics, 'logout');
    this.appState.logout();
  }

  protected handleSync() {
    this.brewService.syncBrewings();
  }
}
