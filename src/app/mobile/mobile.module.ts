import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHomeComponent } from './mobile-home/mobile-home.component';
import { SharedModule } from '../shared/shared.module';
import { MobileRoomComponent } from './mobile-room/mobile-room.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [MobileHomeComponent,MobileRoomComponent,ChatComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MobileModule { }
