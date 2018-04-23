import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';

import { WebComponent } from './web.component';
const routes: Routes = [
    { 
        path: '', component: WebComponent,
        children: [
            { path: '', redirectTo: 'home'},
            { path: 'home', loadChildren: './demo01/home/home.module#HomeModule'},
            
            // { path: 'login', loadChildren: './demo01/login/login.module#LoginModule'},
            // { path: 'register1', loadChildren: './demo01/register1/register1.module#Register1Module'},
            // { path: 'fogotpass', loadChildren: './demo01/fogotpassword/fogotpassword.module#FogotpasswordModule'},
            
            { path: 'event/add', loadChildren: './demo01/event/addevents/addevents.module#AddeventsModule' },
            { path: 'event/edit/:id', loadChildren: './demo01/event/editevents/editevents.module#EditeventsModule' },
            { path: 'event/detail/:id', loadChildren: './demo01/event/detail/detail.module#DetailModule' },
            { path: 'event/checkin/:id', loadChildren: './demo01/event/checkin/checkin.module#CheckinModule' },
            { path: 'event/client', loadChildren: './demo01/event/client/client.module#ClientModule' },
            { path: 'game/listgame', loadChildren: './demo01/game/listgame/listgame.module#ListgameModule'},
            { path: 'game/detailgame/:id', loadChildren: './demo01/game/detailgame/detailgame.module#DetailgameModule'},
            { path: 'game/updategame/:id', loadChildren: './demo01/game/updategame/updategame.module#UpdategameModule'},
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},            
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebRoutingModule {}