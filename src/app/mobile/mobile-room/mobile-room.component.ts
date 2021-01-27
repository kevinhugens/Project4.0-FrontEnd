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
  loading=true;
  allowed = true;
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
    this._roomService.getRoom(this.roomId).subscribe((result) => {
      if(result !== null){
        this.room = result;
        console.log(result)
        //UserID inladen
        this._authenticateService.loggedUser.subscribe(
          result => {
            if(result!= null) {
              var userID = result["userID"].toString();
              //kijken of gebruiker toestemming heeft tot deze room
              
          this._userInRoomService.UserInRoomExists(Number(userID),this.roomId).subscribe(result =>{
            if(result){
              console.log("gebruiker al in room")
              console.log(result)
              //kijk hier of user gekickt is.
              if(result["isAllowed"]){
                console.log("gebruiker toegelaten")
              }else{
                console.log("gebruiker niet toegelaten")
              }
            }else{
              //gebruiker is nog niet in room dus object ordt aangemaakt
              var userInRoom = new UserInRoom();
              userInRoom.RoomID = this.roomId;
              userInRoom.UserID = Number(userID);
              userInRoom.IsAllowed = true;
              console.log(userInRoom);
              this._userInRoomService.addUserInRoom(userInRoom).subscribe();
            }
          });
            }
          }
        );
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    }); 
  }

}
