import { FilterJobPipe } from './pipeSearchNewsByJob.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        AngularMultiSelectModule,
    ],
    declarations: [
        HomeComponent,
        FilterJobPipe
    ]
})

export class HomeModule {}