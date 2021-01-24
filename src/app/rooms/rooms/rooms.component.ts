import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Poll } from 'src/app/shared/models/poll.model';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';
import { PollService } from 'src/app/shared/services/poll.service';
import { RoomService } from 'src/app/shared/services/room.service';

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

  //qr code
  elementType = 'url';
  value = 'http://www.google.be/';
  constructor(private router: Router,private _authenticateService: AuthenticateService, private _roomService: RoomService, private _pollService: PollService) { }

  ngOnInit(): void {
    this.selectedRoom = this._roomService.selectedRoom;
    this._authenticateService.loggedUser.subscribe((result) => {
      this.loggedUser = result;
      if(this.selectedRoom) {
        if(this.loggedUser.userID == this.selectedRoom["presentatorID"]) {
          this.isPresentator = true;
          this.gatherPollsFromRoom();
        }
      }
      this.value += result["token"];
      
    });
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
  showResults() {
    this.router.navigate(["polls"]);
  }

}
