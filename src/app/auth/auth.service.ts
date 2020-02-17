import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public fireAuth: AngularFireAuth) { 
    this.fireAuth.user.subscribe((user) => {
      this.user = user;
    });
    this.fireAuth.auth.onAuthStateChanged((user) => {
      if(user) {
        sessionStorage.setItem('user', JSON.stringify({uid: user.uid}));
      } else {
        sessionStorage.removeItem('user');
      }
    })
  }

  public login() {
    return this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public logout() {
    return this.fireAuth.auth.signOut();
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}
