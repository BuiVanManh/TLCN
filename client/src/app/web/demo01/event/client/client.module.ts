
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClientRoutingModule,
        ReactiveFormsModule,
        
    ],
    declarations: [
        ClientComponent,
    ]
})

export class ClientModule {}