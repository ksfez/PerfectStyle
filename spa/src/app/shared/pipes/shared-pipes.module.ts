import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe }from './filter.pipe'
import { LinkifyPipe }from './linkify.pipe'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [FilterPipe, LinkifyPipe]
})
export class SharedPipesModule { }
