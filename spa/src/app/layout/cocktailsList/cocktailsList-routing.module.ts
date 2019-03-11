import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailsListComponent } from './cocktailsList.component';

const routes: Routes = [
    {
        path: '',
        component: CocktailsListComponent,
		// runGuardsAndResolvers:'always',
		
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CocktailsListRoutingModule {}
