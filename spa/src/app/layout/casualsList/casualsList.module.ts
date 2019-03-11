import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CasualsListRoutingModule } from './casualsList-routing.module';
import { CasualsListComponent } from './casualsList.component';
import { PageHeaderModule } from '../../shared';

import {
    CasualComponent
	//ShoeCreateComponent
} from './components';


@NgModule({
    imports: [
        CommonModule,
        CasualsListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
    ],
	declarations: [
		CasualsListComponent,
		CasualComponent
	]
})

export class CasualsListModule {}
