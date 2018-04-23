import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';


import { AdminComponent } from './admin.component';
const routes: Routes = [
    { 
        path: '', component: AdminComponent,
        children: [
            
            //user
            { path: 'listuser', loadChildren: './users/listuser/listuser.module#ListuserModule'},
            { path: 'formuser', loadChildren: './users/formuser/formuser.module#FormuserModule'},
            { path: 'edituser', loadChildren: './users/edituser/edituser.module#EdituserModule'},
            
            //report

            { path: 'report/list', loadChildren: './report/list/list.module#ListModule'},
            { path: 'report/detail/:id', loadChildren: './report/detail/detail.module#DetailModule'},

            //game

            { path: 'game/list', loadChildren: './game/list/list.module#ListModule'},
            { path: 'game/add', loadChildren: './game/add/add.module#AddgamesModule'},
            { path: 'game/edit/:id', loadChildren: './game/edit/edit.module#EditModule'},
            //client

            { path: 'client/list', loadChildren: './client/list/list.module#ListModule'},
            
            //events
            { path: 'listevents', loadChildren: './event/listevents/listevents.module#ListeventsModule'},
            { path: 'addevents', loadChildren: './event/addevents/addevents.module#AddeventsModule'},
            { path: 'editevents/:id', loadChildren: './event/editevents/editevents.module#EditeventsModule'},
            { path: 'listuv', loadChildren: './event/listuv/listuv.module#ListuvModule'},
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}