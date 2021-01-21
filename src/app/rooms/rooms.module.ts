import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsCreateComponent } from './rooms-create/rooms-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [RoomsComponent, RoomsCreateComponent, ChatComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RoomsModule { }
