import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsCreateComponent } from './rooms-create/rooms-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { RoomsEditComponent } from './rooms-edit/rooms-edit.component';



@NgModule({
  declarations: [RoomsComponent, RoomsCreateComponent, ChatComponent, RoomsEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RoomsModule { }
