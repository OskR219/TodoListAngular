import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TaskResolver } from './components/task/task.resolver';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      tasks: TaskResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
