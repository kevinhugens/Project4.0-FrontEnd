import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';
import { RoomService } from 'src/app/shared/services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  loggedUser: User = null;
  roomsbypresentator: Room[] = [];
  rooms: Room[] = [];
  constructor(private _roomService: RoomService, private _authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
    this._authenticateService.loggedUser.subscribe((user) => {
      if(user !== null && user !== undefined) {
        this.loggedUser = user;
        this._roomService.getAllRoomsFromHistoryFromPresentator(user["userID"]).subscribe((presentator) => {
          this.roomsbypresentator = presentator;
        });
        this._roomService.getAllRoomsFromHistory().subscribe((rooms) => {
          this.rooms = rooms;
        });
      }
    })
  }
  showDetails(roomID: number){
    console.log(roomID);
    this.router.navigate(["room/detail/" + roomID]);   
  }

}
