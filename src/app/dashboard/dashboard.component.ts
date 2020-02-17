import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { Task } from './components/task/task';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase/app'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;

  @ViewChild("newTaskComponent")
  private newTaskComponent: TaskComponent;

  tasks: Observable<Task[]>;
  tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private auth: AuthService, private route: ActivatedRoute, private firestore: AngularFirestore) {
    this.auth.fireAuth.user.subscribe((user) => {
      this.user = user;
    });
    this.tasksCollection = this.route.snapshot.data.tasks;
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit(): void {
  }

  saveNewTask(newTask: Task): void {
    const id = this.firestore.createId();
    let task: Task = { ...newTask };
    task.id = id;
    task.uid = this.user.uid;
    task.date = firestore.Timestamp.now();
    this.tasksCollection.doc(id).set(task);
    this.newTaskComponent.reset();
  }

  updateTask(updatedTask: Task): void {
    let task: Task = { ...updatedTask };
    task.date = firestore.Timestamp.now();
    this.tasksCollection.doc(task.id).set(task);
  }

  deleteTask(deletedTask: Task): void {
    this.tasksCollection.doc(deletedTask.id).delete();
  }

}
