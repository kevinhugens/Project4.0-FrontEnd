import { Component, NgZone, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Message } from 'src/app/shared/models/message.model';
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
  streamUrl: SafeResourceUrl = null;
  //qr code
  elementType = 'url';
  value;
  roomId: number;
  constructor(private route: ActivatedRoute, private _authenticateService: AuthenticateService, private _roomService: RoomService,
    private _userInRoomService: UserInRoomService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get("id"));
    this._authenticateService.loggedUser.subscribe((result) => {
      this.loggedUser = result;
      if (this.roomId) {
        this._roomService.getIsRoomLive(this.roomId).subscribe((live) => {
          if (live == true) {
            this._roomService.getRoom(this.roomId).subscribe((room) => {
              if (result !== null && result !== undefined && room !== null) {
                this.selectedRoom = room;
                this.value = this.selectedRoom["roomID"];
                this.value += "," + result["token"];
                if (this.selectedRoom["linkStream"]) {
                  this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedRoom["linkStream"]);
                }
                  //var userInRoom = new UserInRoom();
                  //userInRoom.RoomID = this.selectedRoom["roomID"];
                  //userInRoom.UserID = result["userID"];
                  //this._userInRoomService.addUserInRoom(userInRoom).subscribe();
              }
            }, () => { console.log("Room bestaat niet."); });
          }
        });
      }
    });
  }

}
