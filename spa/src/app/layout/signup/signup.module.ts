import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { PageHeaderModule } from '../../shared';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
	FileUploadModule,
    SignupRoutingModule,
	FormsModule,
	HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    PageHeaderModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
