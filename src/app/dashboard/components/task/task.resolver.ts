import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Task } from './task';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskResolver implements Resolve<Task> {
    constructor(private auth: AuthService, private firestore: AngularFirestore) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.firestore.collection<Task>('tasks', ref => ref.where('uid', '==', this.auth.getUser().uid).orderBy('date', 'desc'));
    }
}