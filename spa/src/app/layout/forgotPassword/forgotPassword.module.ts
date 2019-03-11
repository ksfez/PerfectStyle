import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForgotPasswordRoutingModule } from './forgotPassword-routing.module';
import { ForgotPasswordComponent } from './forgotPassword.component';

import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
		CommonModule,
		ForgotPasswordRoutingModule,
		FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
		],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {}
