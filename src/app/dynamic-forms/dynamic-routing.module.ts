import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicDashboardComponent } from './dynamic-dashboard/dynamic-dashboard.component';
import { DynamicFormComponent } from './/dynamic-form/dynamic-form.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

const routes: Routes = [
  { path: 'dt', component: DynamicTableComponent },
  { path: 'dt/:title', component: DynamicTableComponent },
  { path: 'dt/:title/:query', component: DynamicTableComponent },
  { path: 'dt/:title/:query/:provider', component: DynamicTableComponent },

  { path: 'dd', component: DynamicDashboardComponent },
  { path: 'dd/:title', component: DynamicDashboardComponent },
  { path: 'dd/:title/:query', component: DynamicDashboardComponent },
  { path: 'dd/:title/:query/:provider', component: DynamicDashboardComponent },

  { path: 'df', component: DynamicFormComponent },
  { path: 'df/:entity', component: DynamicFormComponent },
  { path: 'df/:entity/:id', component: DynamicFormComponent },
  { path: 'df/:entity/:id/:provider', component: DynamicFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DynamicRoutingModule {}
