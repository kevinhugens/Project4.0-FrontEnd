import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsCreateComponent } from './rooms-create/rooms-create.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [RoomsComponent, RoomsCreateComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RoomsModule { }
