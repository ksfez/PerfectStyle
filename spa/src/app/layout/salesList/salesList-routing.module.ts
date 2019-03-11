import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesListComponent } from './salesList.component';

const routes: Routes = [
    {
        path: '',
        component: SalesListComponent,
		// runGuardsAndResolvers:'always',
		
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalesListRoutingModule {}
