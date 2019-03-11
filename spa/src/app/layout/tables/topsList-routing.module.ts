import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopsListComponent } from './topsList.component';

const routes: Routes = [
    {
        path: '',
        component: TopsListComponent,
		// runGuardsAndResolvers:'always',
		
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TopsListRoutingModule {}
