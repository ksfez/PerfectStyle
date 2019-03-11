import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import {FileUploadModule} from 'ng2-file-upload';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
		CommonModule,
	    FileUploadModule,
		ProfileRoutingModule,
		FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
		],
    declarations: [ProfileComponent]
})
export class ProfileModule {}
