import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { User } from '@domain/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private user = new BehaviorSubject<User | null>(null);
  readonly user$ = this.user.asObservable();
  private syncing = new BehaviorSubject<boolean>(false);
  readonly syncing$ = this.syncing.asObservable();

  constructor() {
    onAuthStateChanged(getAuth(), user => {
      console.log('[AppStateService]', 'user changed', user);
      if (user) {
        this.user.next(User.restore({
          name: user.displayName || '',
          picture: user.photoURL || '',
          id: user.uid,
        }));
      } else {
        this.user.next(null);
      }
    });
  }

  logout() {
    signOut(getAuth());
    this.user.next(null);
  }

  get currentUser() {
    return this.user.getValue();
  }

  setSyncing(syncing: boolean) {
    this.syncing.next(syncing);
  }
}
