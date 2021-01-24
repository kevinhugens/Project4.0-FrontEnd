import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';
import { RoomService } from 'src/app/shared/services/room.service';
import { PollService } from 'src/app/shared/services/poll.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedUser: User = null;
  rooms: Room[] = [];
  constructor(private _roomService: RoomService,private _authenticateService: AuthenticateService, 
    private _pollService: PollService, private _router: Router, private snackBar: MatSnackBar) {
    _roomService.getRooms().subscribe((result) => {
      this.rooms = result;
    });
  }

  ngOnInit(): void {
    this._authenticateService.loggedUser.subscribe((result) => {
      this.loggedUser = result;
    });
  }

  createRoom() {
    this._router.navigate(["rooms/create"]);
  }

  editRoom(room: Room) {
    this._roomService.selectedRoom = room;
    this._router.navigate(["rooms/edit"]);
    
  }
  followStream(room: Room) {
    this._roomService.selectedRoom = room;
    this._router.navigate(["rooms"]);
  }

  deleteRoom(room: Room) {
    if(confirm("Ben je zeker dat je de room wilt verwijderen?")) {
      this._roomService.deleteRoom(room["roomID"]).subscribe((result) => {
        this.snackBar.open("Room " + room["name"] + " verwijderen.", "", { duration: 5000 });
        this._roomService.getRooms().subscribe((data) => {
          this.rooms = data;
        });
      });
    }
  }

  goLive(room: Room) {
    if(confirm("Ben je zeker dat je live wil gaan?")) {
      room["live"] = true;
      this._roomService.updateRoom(room["roomID"],room).subscribe((result) => {
        this.snackBar.open("Room " + room["name"] + " gaat live.", "", { duration: 5000 });
          this._roomService.getRooms().subscribe((data) => {
            this.rooms = data;
          });
      });
    }
  }

  managePolls(id: number) {
    if(id != null) {
      this._pollService.roomID = id;
      this._router.navigate(["managepolls"]);
    }
  }
}
