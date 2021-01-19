import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from './polls/polls.component';
import { ManagePollsComponent } from './manage-polls/manage-polls.component';
import { SharedModule } from '../shared/shared.module'


@NgModule({
  declarations: [PollsComponent, ManagePollsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PollsModule { }
