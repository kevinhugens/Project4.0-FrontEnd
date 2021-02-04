import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Room } from 'src/app/shared/models/room.model';
import { UserInRoom } from 'src/app/shared/models/user-in-room.model';
import { User } from 'src/app/shared/models/user.model';
import { RoomService } from 'src/app/shared/services/room.service';
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
  constructor(private route: ActivatedRoute, private router: Router, private _authenticateService: AuthenticateService, 
    private _roomService: RoomService, private _userInRoomService: UserInRoomService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get("id"));
    this._authenticateService.loggedUser.subscribe((user) => {
      console.log(user);
      console.log(this.roomId);
      if (user !== null && user !== undefined && this.roomId) {
        this.loggedUser = user;
        this._roomService.getIsRoomLive(this.roomId).subscribe((live) => {
          if (live == true) {
            this._roomService.getRoom(this.roomId).subscribe((room) => {
              if (room !== null) {
                this._userInRoomService.UserInRoomExists(Number(this.loggedUser["userID"]), this.roomId).subscribe(result => {
                  if (!result) {
                    if (room["password"] !== null && room["password"] !== "") {
                      var password = prompt("Geef het stream wachtwoord op");
                      if (password == room["password"]) {
                        var userInRoom = new UserInRoom();
                        userInRoom.RoomID = this.roomId;
                        userInRoom.UserID = Number(this.loggedUser["userID"]);
                        userInRoom.IsAllowed = true;
                        this._userInRoomService.addUserInRoom(userInRoom).subscribe();
                        this.update(room);
                      }
                      else {
                        alert("Verkeerd wachtwoord!");
                        this.router.navigate(["home"]);                   
                      }
                    }       
                  } else {
                    this.update(room);
                  }
                });              
              }
            });
          }
        }, () => { console.log("Room bestaat niet."); });
      }
    });
  }

  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
  update(room : Room) {
    this.selectedRoom = room;
    this.value = this.selectedRoom["roomID"];
    this.value += "," + this.loggedUser["token"];
    if (this.selectedRoom["linkStream"]) {
      this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.getId(this.selectedRoom["linkStream"]));
    }
  }

}
