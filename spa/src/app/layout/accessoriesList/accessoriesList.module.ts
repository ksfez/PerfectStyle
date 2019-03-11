import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccessoriesListRoutingModule } from './accessoriesList-routing.module';
import { AccessoriesListComponent } from './accessoriesList.component';
import { PageHeaderModule } from '../../shared';

import {
    AccessorieComponent
} from './components';


@NgModule({
    imports: [
        CommonModule,
        AccessoriesListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
    ],
	declarations: [
		 AccessoriesListComponent,
		 AccessorieComponent
	]
})

export class AccessoriesListModule {}
