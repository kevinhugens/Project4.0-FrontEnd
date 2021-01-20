import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  loggedUser: User = null;
  selectedRoom: Room = null;
  constructor(private _authenticateService: AuthenticateService, private _roomService: RoomService) { }

  ngOnInit(): void {
    this.selectedRoom = this._roomService.selectedRoom;
    this._authenticateService.loggedUser.subscribe((result) => {
      this.loggedUser = result;
    });
  }

}
