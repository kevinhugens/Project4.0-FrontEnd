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
  roomslive: Room[] = [];
  roomsthisweek: Room[] = [];
  roomsbypresentator: Room[] = [];
  currentDate: Date = new Date();
  constructor(private _roomService: RoomService, private _authenticateService: AuthenticateService,
    private _pollService: PollService, private _router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._authenticateService.loggedUser.subscribe((result) => {
      this.loggedUser = result;
      if (result != null) {
        this.update();
      }
    });
  }

  createRoom() {
    this._router.navigate(["room/create"]);
  }

  editRoom(room: Room) {
    this._roomService.selectedRoom = room;
    this._router.navigate(["room/edit"]);

  }
  followStream(room: Room) {
    this._roomService.selectedRoom = room;
    if (room["password"] !== null && room["password"] !== "") {
      var password = prompt("Geef het stream wachtwoord op");
      if (password == room["password"]) {
        this._router.navigate(["room"]);
      }
      else {
        alert("Verkeerd wachtwoord!");
      }
    } else {
      this._router.navigate(["room"]);
    }
  }

  deleteRoom(room: Room) {
    if (confirm("Ben je zeker dat je de room wilt verwijderen?")) {
      this._roomService.deleteRoom(room["roomID"]).subscribe((result) => {
        this.snackBar.open("Room " + room["name"] + " verwijderen.", "", { duration: 5000 });
        this.update();
      });
    }
  }

  goLive(room: Room) {
    if(room["live"] === true) {
      if (confirm("Room staat al live.\nBen je zeker dat je deze niet meer als live wil publiceren?")) {
        room["live"] = false;
        this._roomService.updateRoom(room["roomID"], room).subscribe((result) => {
          this.snackBar.open("Room " + room["name"] + " is niet meer live.", "", { duration: 5000 });
          this.update();
        });
      }
    } else {
      if (confirm("Ben je zeker dat je live wil gaan?")) {
        room["live"] = true;
        this._roomService.updateRoom(room["roomID"], room).subscribe((result) => {
          this.snackBar.open("Room " + room["name"] + " gaat live.", "", { duration: 5000 });
          this.update();
        });
      }
    }
    
  }

  managePolls(id: number) {
    if (id != null) {
      this._pollService.roomID = id;
      this._router.navigate(["managepolls"]);
    }
  }
  update(){
    this._roomService.getAllRoomsForThisWeek().subscribe((rooms) => {
      this.roomsthisweek = rooms;
    });
    this._roomService.getAllRoomsFromPresentator(this.loggedUser["userID"]).subscribe((data) => {
      this.roomsbypresentator = data;
    });
    this._roomService.getAllLiveRooms().subscribe((live) => {
      this.roomslive = live;
    });
  }
}
