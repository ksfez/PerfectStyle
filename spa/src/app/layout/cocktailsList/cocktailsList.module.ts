import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CocktailsListRoutingModule } from './cocktailsList-routing.module';
import { CocktailsListComponent } from './cocktailsList.component';
import { PageHeaderModule } from '../../shared';

import {
    CocktailComponent
} from './components';


@NgModule({
    imports: [
        CommonModule,
        CocktailsListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
    ],
	declarations: [
		CocktailsListComponent,
		CocktailComponent
	]
})

export class CocktailsListModule {}
