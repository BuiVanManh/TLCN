import { MyDatePickerModule } from 'mydatepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddeventsRoutingModule } from './addevents-routing.module';
import { AddeventsComponent } from './addevents.component';
import { EditorModule } from '@tinymce/tinymce-angular';

import { CKEditorModule } from 'ng2-ckeditor';
import { CkEditorModule } from './ckeditor.module';

@NgModule({
    imports: [
        CommonModule,
        AddeventsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        EditorModule,
        CKEditorModule,
        MyDatePickerModule,
        CkEditorModule
    ],
    declarations: [
        AddeventsComponent
    ]
})

export class AddeventsModule {}