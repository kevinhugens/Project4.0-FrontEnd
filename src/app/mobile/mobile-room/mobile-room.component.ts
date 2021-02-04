import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Room } from 'src/app/shared/models/room.model';
import { RoomService } from 'src/app/shared/services/room.service';
import { UserInRoom } from 'src/app/shared/models/user-in-room.model';
import { UserInRoomService } from 'src/app/shared/services/user-in-room.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-mobile-room',
  templateUrl: './mobile-room.component.html',
  styleUrls: ['./mobile-room.component.scss']
})
export class MobileRoomComponent implements OnInit {
  loggedUser: User = null;
  roomId;
  room: Room = null;
  loading = true;
  allowed = false;
  roomslive: Room[] = [];
  isLive = false;
  roomExist = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _roomService: RoomService,
    private _userInRoomService: UserInRoomService,
    private _authenticateService: AuthenticateService,
  ) { }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get("id"));
    this._authenticateService.loggedUser.subscribe((user) => {
      this.loggedUser = user;
      if (user !== null && user !== undefined && this.roomId) {
        this._roomService.getIsRoomLive(this.roomId).subscribe((data) => {
          if (data == true) {
            this.roomExist = true;
            this.isLive = true;
            this._roomService.getRoom(this.roomId).subscribe((room) => {
              if (room !== null) {
                this.room = room;
                this._userInRoomService.UserInRoomExists(Number(user["userID"]), this.roomId).subscribe(result => {
                  if (!result) {
                    if (room["password"] !== null && room["password"] !== "") {
                      var password = prompt("Geef het stream wachtwoord op");
                      if (password == room["password"]) {
                        this.addUserInRoom();
                        this.allowed = true;
                      }
                      else {
                        alert("Verkeerd wachtwoord!");
                        this.router.navigate(["mobile/home"]);
                      }
                    } else {
                      this.addUserInRoom();
                      this.allowed = true;
                    }
                  } else {
                    this.allowed = true;
                  }
                });
              }
            });
          } else {
            this.roomExist = true;
            this.isLive = false;
          }
          this.loading = false;
        }, () => { this.loading = false; });
      }
      this.loading = false;
    });
  }
  addUserInRoom(){
    var userInRoom = new UserInRoom();
    userInRoom.RoomID = this.roomId;
    userInRoom.UserID = Number(this.loggedUser["userID"]);
    this._userInRoomService.addUserInRoom(userInRoom).subscribe();
  }

}
