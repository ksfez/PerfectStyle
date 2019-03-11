import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TopsListRoutingModule } from './topsList-routing.module';
import { TopsListComponent } from './topsList.component';
import { PageHeaderModule } from '../../shared';

import {
    TopComponent
	//ShoeCreateComponent
} from './components';


@NgModule({
    imports: [
        CommonModule,
        TopsListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
    ],
	declarations: [
		TopsListComponent,
		TopComponent
		//ShoeCreateComponent
	]
})

export class TopsListModule {}
