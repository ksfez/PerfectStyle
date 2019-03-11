import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './stores.component';

import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
		CommonModule,
		NgxPayPalModule,
		StoresRoutingModule,
		FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
		],
    declarations: [StoresComponent]
})
export class StoresModule {}
