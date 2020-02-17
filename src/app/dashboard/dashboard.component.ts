import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { Task } from './components/task/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("newTaskComponent")
  private newTaskComponent: TaskComponent;
  newTask: Task = {
    title: "",
    description: "",
    status: "",
    date: null,
  }

  tasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  saveNewTask(): void {
    let task = this.newTaskComponent.getTask();
    this.tasks.unshift({ ...task});
    this.newTaskComponent.reset();
  }

  updateTask(): void {

  }

}
