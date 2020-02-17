import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  public login() {
    return this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public logout() {
    return this.fireAuth.auth.signOut();
  }
}
