import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from './task';
import { faLink, faCheck, faTimes, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = {
    id: "",
    title: "",
    description: "",
    status: "",
    date: null,
    uid: "",
    subtasks: [],
  };
  @Input() isNew = false;
  @Output() saved = new EventEmitter<Task>();
  @Output() deleted = new EventEmitter<Task>();

  faLink = faLink;
  faCheck = faCheck;
  faTimes = faTimes;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  public backupTask: Task;

  isEditing = false;

  subtask: string = "";

  constructor() { 
    this.backupTask = JSON.parse(JSON.stringify(this.task));
  }

  ngOnInit(): void {
  }

  discard(): void {
    this.task = JSON.parse(JSON.stringify(this.backupTask));
    this.isEditing = false;
  }

  save(): void {
    this.isEditing = false;
    this.saved.emit(this.task);
  }

  edit(): void {
    this.backupTask = JSON.parse(JSON.stringify(this.task));
    this.isEditing = true;
  }

  delete(): void {
    this.deleted.emit(this.task);
  }

  get isValidTask(): boolean {
    return this.task.title != '';
  }

  public getTask(): Task {
    return this.task;
  }

  public reset(): void {
    this.task = {
      id: "",
      title: "",
      description: "",
      status: "",
      date: null,
      uid: "",
      subtasks: [],
    }
  }

  public addSubtask(): void {
    if(!this.task.subtasks) {
      this.task.subtasks = [];
    }
    this.task.subtasks.unshift(this.subtask);
    this.subtask = "";
  }

  public discardSubtask(): void {
    this.subtask = "";
  }

  public deleteSubtask(subtaskIndex): void {
    this.task.subtasks.splice(subtaskIndex, 1);
  }

}
