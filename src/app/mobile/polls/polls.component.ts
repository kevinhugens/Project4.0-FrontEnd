import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Poll } from 'src/app/shared/models/poll.model';
import { SignalRService } from 'src/app/shared/services/signal-r.service';
import { UserPoll } from 'src/app/shared/models/user-poll.model';
import { Option } from 'src/app/shared/models/Option.model';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { UserPollService } from 'src/app/shared/services/user-poll.service';
import { User } from 'src/app/shared/models/user.model';
@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  polls: Poll[];
  activePollForThisRoom: Poll;
  currentUser: User;
  @Input() roomID: number;
  constructor(private _userPollService: UserPollService,private _signalRService: SignalRService, 
    private _ngZone: NgZone,private _authenticateService: AuthenticateService) { }

  ngOnInit(): void {
    this._authenticateService.loggedUser.subscribe((data)=> {
      this.currentUser = data;
    })
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {  
    this._signalRService.connectionEstablished.subscribe(() => {
      this._ngZone.run(() => {
        this._signalRService.joinRoom(this.roomID);
      });
    });
  
    this._signalRService.pollReceived.subscribe((poll: Poll) => {  
      this._ngZone.run(() => {  
        this.activePollForThisRoom = poll;
      });  
    });  
  }  

  saveOption(option: Option) {
    var userPoll = new UserPoll();
    userPoll.PollID = option["pollID"]
    userPoll.OptionID = option["optionID"];
    userPoll.UserID = this.currentUser["userID"];
    this._userPollService.addUserPoll(userPoll).subscribe(() => {
      this.activePollForThisRoom = null;
    });
  }

}
