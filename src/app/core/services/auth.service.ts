import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import firebase from 'firebase';
import auth = firebase.auth;
import {Router} from '@angular/router';
import {FirestoreUserService} from './firestore-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  authState;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private firestoreUserService: FirestoreUserService,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async logInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const userCredential =  await this.afAuth.signInWithPopup(provider);
    if (userCredential.additionalUserInfo.isNewUser) {
      await this.saveUserInFirestore(userCredential.user);
    }
    return this.navigateHome();
  }

  async logInWithEmailPassword(email, password) {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    return this.navigateHome();
  }

  async logOut() {
    await this.afAuth.signOut();
    return this.navigateHome();
  }

  async registerWithEmailPassword(user) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    user.uid = credential.user.uid;
    await this.saveUserInFirestore(user);
    return this.navigateHome();
  }

  private async navigateHome() {
    await this.router.navigate(['/']);
  }

  private async saveUserInFirestore(data) {
    await this.firestoreUserService.saveNewUserData(data);
  }
}
