import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/shared/services/poll.service';
import { OptionService } from 'src/app/shared/services/option.service';
import { Option } from '../../shared/models/Option.model';
import { Poll } from '../../shared/models/poll.model';

@Component({
  selector: 'app-manage-polls',
  templateUrl: './manage-polls.component.html',
  styleUrls: ['./manage-polls.component.scss']
})
export class ManagePollsComponent implements OnInit {
  beheerPolls : Poll[] = [];
  newOption : Option = new Option();
  newPoll : Poll = new Poll();
  roomID: number;
  constructor(private _pollService: PollService, private _optionService: OptionService) { }

  ngOnInit(): void {
    if(this._pollService.roomID != null) {
      this.roomID = this._pollService.roomID;
      this.updateList();
    }
  }

  addPoll() {
    this.newPoll.RoomID = this.roomID;
    this._pollService.addPoll(this.newPoll).subscribe((result) => {
      this.updateList();
      this.newPoll = new Poll();
    });
  }
  
  deletePoll(poll: Poll) {
    this._pollService.deletePoll(poll["pollID"]).subscribe((result) => {
      this.updateList();
    });
  }

  addOption(poll: Poll) {
    var option = new Option();
    option.Content = prompt("Geef een optie");
    option.PollID = poll["pollID"];
    this._optionService.addOption(option).subscribe((result) => {
      this.updateList();
    });
  }

  editOption(option: Option) {
    option.Content = prompt("Geef een nieuwe waarde voor de optie");
    this._optionService.updateOption(option["optionID"],option).subscribe((result) => {
      this.updateList();
    });
  }

  deleteOption(option: Option) {
    this._optionService.deleteOption(option["optionID"]).subscribe((result) => {
      this.updateList();
    });
  }

  updateList() {
    this._pollService.getAllPollsByRoomID(this.roomID).subscribe((data) => {
      this.beheerPolls = data;
    });
  }
}
