import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersListComponent } from './workersList.component';

const routes: Routes = [
    {
        path: '',
        component: WorkersListComponent,
		// runGuardsAndResolvers:'always',
		
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkersListRoutingModule {}
