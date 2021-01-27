import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Poll } from 'src/app/shared/models/poll.model';
import { Room } from 'src/app/shared/models/room.model';
import { UserInRoom } from 'src/app/shared/models/user-in-room.model';
import { User } from 'src/app/shared/models/user.model';
import { PollService } from 'src/app/shared/services/poll.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { SignalRService } from 'src/app/shared/services/signal-r.service';
import { UserInRoomService } from 'src/app/shared/services/user-in-room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  loggedUser: User = null;
  selectedRoom: Room = null;
  isPresentator = false;
  lijstPolls: Poll[] = [];
  activePollForPresentator: Poll;
  //qr code
  elementType = 'url';
  value;
  constructor(private router: Router,private _authenticateService: AuthenticateService, private _roomService: RoomService, 
    private _pollService: PollService, private _userInRoomService: UserInRoomService, private _signalRService: SignalRService) { }

  ngOnInit(): void {
    this.selectedRoom = this._roomService.selectedRoom;
    this._authenticateService.loggedUser.subscribe((result) => {
      this.loggedUser = result;
      if(this.selectedRoom) {
        if(this.loggedUser.userID == this.selectedRoom["presentatorID"]) { //controleren op null
          this.isPresentator = true;
          this.gatherPollsFromRoom();
        }
        if(result != null) {
          this.value=this.selectedRoom["roomID"];
          this.value += ","+ result["token"];

          //var userInRoom = new UserInRoom();
          //userInRoom.RoomID = this.selectedRoom["roomID"];
          //userInRoom.UserID = result["userID"];
          //this._userInRoomService.addUserInRoom(userInRoom).subscribe();
        }
      }
    });
  }

  openPoll(poll: Poll) {
    this._signalRService.sendPoll(poll,this.selectedRoom["roomID"]);
  }

  gatherPollsFromRoom(){
    this._pollService.getAllPollsByRoomID(this.selectedRoom["roomID"]).subscribe((result) => {
      this.lijstPolls = result;
    });
  }
  stopStream() {
    if(confirm("Ben je zeker dat je de stream wil stoppen?")) {
      this.selectedRoom["live"] = false;
      this._roomService.updateRoom(this.selectedRoom['roomID'],this.selectedRoom).subscribe(() => {
        this.router.navigate(["home"]);
      });
    }
  }
  showResults(poll: Poll) {
    this.router.navigate(["polls/"+poll["pollID"]]);
  }

}
