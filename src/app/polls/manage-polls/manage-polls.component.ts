import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
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
    optie.content = prompt("Mogelijk antwoord");
    this.beheerPolls[i].antwoorden.push(optie);
  }
  editOption(i: any,y:any) {
    
    this.beheerPolls[i].antwoorden[y].content = prompt("Update optie");
  }
  deleteOption(i:any,y: any) {
    this.beheerPolls[i].antwoorden.splice(y,1);
  }
  onSubmit() {
    console.log(this.beheerPolls);
  }
}
