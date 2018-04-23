import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditeventsRoutingModule } from './editevents-routing.module';
import { EditeventsComponent } from './editevents.component';

import { MyDatePickerModule } from 'mydatepicker';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
    imports: [
        CommonModule,
        EditeventsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        EditorModule,
        CKEditorModule,
        MyDatePickerModule 

    ],
    declarations: [
        EditeventsComponent
    ]
})

export class EditeventsModule {}