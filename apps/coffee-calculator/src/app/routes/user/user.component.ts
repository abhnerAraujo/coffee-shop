import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { getAuth, GoogleAuthProvider } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { signInWithCredential } from '@firebase/auth';
import { AppStateService } from '@shared/services/app-state.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements AfterViewInit {
  protected user = signal<{ picture: string; name: string } | null>(null);
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private appState: AppStateService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.appState.user$.pipe(skip(1)).subscribe(user => {
      this.handleUser(user);
    });
    setTimeout(() => {
      const user = this.appState.currentUser;

      this.handleUser(user);
    }, 1000);
  }

  private handleUser(user: { name: string; picture: string } | null) {
    if (!user) {
      this.handleGoogleSignIn();
      this.user.set(null);
    } else
      this.user.set({
        ...user,
      });
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
    setTimeout(() => {
      google.accounts.id.prompt(); // also display the One Tap dialog
    }, 3 * 1000);
  }

  protected handleSignout() {
    this.appState.logout();
  }
}
