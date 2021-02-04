import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { PollsComponent } from './polls/polls/polls.component';
import { RoomsComponent} from './rooms/rooms/rooms.component';
import { ManagePollsComponent } from './polls/manage-polls/manage-polls.component';
import { LoginComponent } from './security/login/login.component';
import { RoomsCreateComponent } from './rooms/rooms-create/rooms-create.component';
import { ChatComponent } from './mobile/chat/chat.component';
import { RoomsEditComponent } from './rooms/rooms-edit/rooms-edit.component';
import { RoomsDetailComponent } from './rooms/rooms-detail/rooms-detail.component';
import { MobileRoomComponent } from './mobile/mobile-room/mobile-room.component';
import { MobileHomeComponent } from './mobile/mobile-home/mobile-home.component';
import { PanelComponent } from './rooms/panel/panel.component';
import { HistoryComponent } from './rooms/history/history.component';
import { Error404Component } from './shared/error404/error404.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'room/watch/:id', component: RoomsComponent },
  { path: 'room/presentator/:id', component: PanelComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'polls/:id', component: PollsComponent },
  { path: 'managepolls', component: ManagePollsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'room/create', component: RoomsCreateComponent },
  { path: 'room/detail/:id', component: RoomsDetailComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'room/edit', component: RoomsEditComponent },
  { path: 'mobile/room/:id', component: MobileRoomComponent },
  { path: 'mobile/home', component: MobileHomeComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
