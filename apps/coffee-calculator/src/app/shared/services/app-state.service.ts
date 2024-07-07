import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private user = new BehaviorSubject<{
    name: string;
    picture: string;
    id: string;
  } | null>(null);

  readonly user$ = this.user.asObservable();

  constructor() {
    onAuthStateChanged(getAuth(), user => {
      console.log('[AppStateService]', 'user changed', user);
      if (user) {
        this.user.next({
          name: user.displayName || '',
          picture: user.photoURL || '',
          id: user.uid,
        });
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
}
