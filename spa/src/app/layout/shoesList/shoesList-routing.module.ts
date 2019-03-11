import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoesListComponent } from './shoesList.component';

const routes: Routes = [
    {
        path: '',
        component: ShoesListComponent,
		// runGuardsAndResolvers:'always',
		
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoesListRoutingModule {}
