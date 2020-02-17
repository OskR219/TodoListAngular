import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from './task';
import { faLink, faCheck, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() isNew = false;
  @Output() saved = new EventEmitter<void>();
  @Output() discarded = new EventEmitter<void>();

  faLink = faLink;
  faCheck = faCheck;
  faTimes = faTimes;
  faPencilAlt = faPencilAlt;  

  public oldTask: Task;

  isEditing = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.task)
  }

  discard(): void {
    this.task = {...this.oldTask};
    this.isEditing = false;
    this.discarded.emit();
  }

  save(): void {
    this.isEditing = false;
    this.saved.emit();
  }

  edit(): void {
    this.oldTask = {...this.task};
    this.isEditing = true;
  }

  get isValidTask(): boolean {
    return this.task.title != '';
  }

  public getTask(): Task {
    return this.task;
  }

  public reset(): void {
    this.task = {
      title: "",
      description: "",
      status: "",
      date: null,
    }
  }

}
