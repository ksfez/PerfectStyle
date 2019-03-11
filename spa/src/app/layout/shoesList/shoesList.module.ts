import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoesListRoutingModule } from './shoesList-routing.module';
import { ShoesListComponent } from './shoesList.component';
import { PageHeaderModule } from '../../shared';

import {
    ShoeComponent
	//ShoeCreateComponent
} from './components';


@NgModule({
    imports: [
        CommonModule,
        ShoesListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
    ],
	declarations: [
		ShoesListComponent,
		ShoeComponent
		//ShoeCreateComponent
	]
})

export class ShoesListModule {}
