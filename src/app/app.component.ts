import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticateService } from './security/services/authenticate.service';
import { Room } from './shared/models/room.model';
import { User } from './shared/models/user.model';
import { RoomService } from './shared/services/room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project4-frontend';
  rooms: Room[] = []
  currentUser: User;

  constructor(private router: Router, private snackBar: MatSnackBar, private _authenticateService: AuthenticateService, private _roomService: RoomService) {
    this._roomService.getRooms().subscribe((result) => {
      this.rooms = result;
    });
    this._authenticateService.loggedUser.subscribe(
      result => {
        this.currentUser = result;
      }
    );
  }

  logout() {
    localStorage.clear();
    this.snackBar.open("Tot later " + this.currentUser.firstName + " " + this.currentUser.lastName + "!", "", { duration: 5000 });
    this._authenticateService.logUser(null);
    this.router.navigate(['home']);
  }
}