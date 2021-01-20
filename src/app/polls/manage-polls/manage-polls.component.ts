import { Component, OnInit } from '@angular/core';
import { PollService } from 'src/app/shared/services/poll.service';
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
  constructor(private _pollService: PollService) { }

  ngOnInit(): void {
    if(this._pollService.pollsFromRoom != null) {
      this.beheerPolls = this._pollService.pollsFromRoom;
    }
  }

  addPoll() {
    this.beheerPolls.push(this.newPoll);
    this.newPoll = new Poll();
  }
  deletePoll(i: any) {
    this.beheerPolls.splice(i,1);
  }
  addOption(i: any) {
    var optie = new Option();
    optie.Content = prompt("Mogelijk antwoord");
    //this.beheerPolls[i].Options.(optie);
  }
  editOption(i: any,y:any) {
    
    this.beheerPolls[i].Options[y].Content = prompt("Update optie");
  }
  deleteOption(i:any,y: any) {
    //this.beheerPolls[i].Options.splice(y,1);
  }
  onSubmit() {
    console.log(this.beheerPolls);
  }
}
