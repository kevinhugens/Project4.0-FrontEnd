import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Room } from 'src/app/shared/models/room.model';
import { RoomService } from 'src/app/shared/services/room.service';
import { UserInRoom } from 'src/app/shared/models/user-in-room.model';
import { UserInRoomService } from 'src/app/shared/services/user-in-room.service';

@Component({
  selector: 'app-mobile-room',
  templateUrl: './mobile-room.component.html',
  styleUrls: ['./mobile-room.component.scss']
})
export class MobileRoomComponent implements OnInit {
  roomId;
  room: Room = null;
  loading = true;
  allowed = true;
  roomslive: Room[] = [];
  isLive = false;
  roomExist = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _roomService: RoomService,
    private _userInRoomService: UserInRoomService,
    private _authenticateService: AuthenticateService,
  ) {
  }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get("id"));
    this._roomService.getIsRoomLive(this.roomId).subscribe((data) => {
      if (data == true) {
        this.roomExist = true;
        this.isLive = true;
        this._roomService.getRoom(this.roomId).subscribe((room) => {
          if (room !== null) {
            this.room = room;
            this._authenticateService.loggedUser.subscribe(
              result => {
                if (result != null) {
                  var userID = result["userID"].toString();
                  this._userInRoomService.UserInRoomExists(Number(result["userID"]), this.roomId).subscribe(result => {
                    if (!result) {
                      if (room["password"] !== null && room["password"] !== "") {
                        var password = prompt("Geef het stream wachtwoord op");
                        if (password == room["password"]) {
                          var userInRoom = new UserInRoom();
                          userInRoom.RoomID = this.roomId;
                          userInRoom.UserID = Number(result["userID"]);
                          userInRoom.IsAllowed = true;
                          this._userInRoomService.addUserInRoom(userInRoom).subscribe();
                        }
                        else {
                          alert("Verkeerd wachtwoord!");
                          this.router.navigate(["mobile/home"]);                   
                        }
                      }       
                    }
                  });   
                }
              });
          }
        });
      } else {
        this.roomExist = true;
        this.isLive = false;
      }
      this.loading = false;
    },() => {this.loading = false;});

  }

}
