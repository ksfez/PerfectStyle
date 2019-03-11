import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { MessageComponent } from './components';
import { FilterPipe }from '../../shared/pipes/filter.pipe'
import { LinkifyPipe }from '../../shared/pipes/linkify.pipe'

import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
		CommonModule,
		ChatRoutingModule,
		FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule
		],
    declarations: [ChatComponent, MessageComponent, FilterPipe, LinkifyPipe]
})
export class ChatModule {}
