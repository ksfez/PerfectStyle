import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WorkersListRoutingModule } from './workersList-routing.module';
import { WorkersListComponent } from './workersList.component';
import { PageHeaderModule } from '../../shared';

import {
    WorkerComponent
} from './components';


@NgModule({
    imports: [
        CommonModule,
        WorkersListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
    ],
	declarations: [
		WorkersListComponent,
		WorkerComponent
	]
})

export class WorkersListModule {}
