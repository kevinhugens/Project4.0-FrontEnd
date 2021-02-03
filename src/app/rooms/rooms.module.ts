import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsCreateComponent } from './rooms-create/rooms-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomsEditComponent } from './rooms-edit/rooms-edit.component';
import { MobileModule } from '../mobile/mobile.module';
import { PanelComponent } from './panel/panel.component';
import { HistoryComponent } from './history/history.component';
import { RoomsDetailComponent } from './rooms-detail/rooms-detail.component';



@NgModule({
  declarations: [RoomsComponent, RoomsCreateComponent, RoomsEditComponent, PanelComponent, HistoryComponent, RoomsDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    MobileModule
  ]
})
export class RoomsModule { }
