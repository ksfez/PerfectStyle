import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FileUploadModule} from 'ng2-file-upload';

import { UsersListRoutingModule } from './usersList-routing.module';
import { UsersListComponent } from './usersList.component';
import { PageHeaderModule } from './../../shared';

import {
    UserComponent
} from './components';

@NgModule({
    imports: [
		CommonModule,
		FileUploadModule,
		UsersListRoutingModule,
		FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
		PageHeaderModule
	],
    declarations: [UsersListComponent, UserComponent]
})
export class UsersListModule {}
