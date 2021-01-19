import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { PollsComponent } from './polls/polls/polls.component';
import { RoomsComponent} from './rooms/rooms/rooms.component';
import { ManagePollsComponent } from './polls/manage-polls/manage-polls.component';
import { LoginComponent } from './security/login/login.component';
import { RoomsCreateComponent } from './rooms/rooms-create/rooms-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'rooms', component: RoomsComponent },
  { path: 'polls', component: PollsComponent },
  { path: 'managepolls', component: ManagePollsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'rooms/create', component: RoomsCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
