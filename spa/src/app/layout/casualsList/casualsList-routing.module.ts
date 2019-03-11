import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CasualsListComponent } from './casualsList.component';

const routes: Routes = [
    {
        path: '',
        component: CasualsListComponent,
		// runGuardsAndResolvers:'always',
		
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CasualsListRoutingModule {}
