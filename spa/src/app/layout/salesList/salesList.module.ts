import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SalesListRoutingModule } from './salesList-routing.module';
import { SalesListComponent } from './salesList.component';
import { PageHeaderModule } from '../../shared';

import {
    SaleComponent
} from './components';


@NgModule({
    imports: [
        CommonModule,
        SalesListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
    ],
	declarations: [
		SalesListComponent,
		SaleComponent
	]
})

export class SalesListModule {}
