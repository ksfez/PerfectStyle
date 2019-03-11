import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessoriesListComponent } from './accessoriesList.component';

const routes: Routes = [
    {
        path: '',
        component:  AccessoriesListComponent,
		// runGuardsAndResolvers:'always',
		
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class  AccessoriesListRoutingModule {}
