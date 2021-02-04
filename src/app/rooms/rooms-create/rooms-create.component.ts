import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/shared/models/room.model'
import { RoomService } from 'src/app/shared/services/room.service'
import { UserService } from 'src/app/shared/services/user.service'
import { UserInRoomService } from 'src/app/shared/services/user-in-room.service'
import { AuthenticateService } from 'src/app/security/services/authenticate.service';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.component.html',
  styleUrls: ['./rooms-create.component.scss']
})
export class RoomsCreateComponent implements OnInit {

  userId;
  model: Room;
  loading = false;
  submitted = false;
  startTime: String;
  endTime: String;
  linkPattern = "^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$";
  moderatorEmail = "";
  presentatorEmail = "";
  isInvalidPresentator = false;
  isVerifiedPresentator = false;
  isInvalidModerator = false;
  isVerifiedModerator = false;

  constructor(
    private router: Router,
    private _roomService: RoomService,
    private _authenticateService: AuthenticateService,
    private _userService: UserService) { }


  ngOnInit(): void {
    this.model = new Room();
    this._authenticateService.loggedUser.subscribe(
      result => {
        if (result) {
          this.model.PresentatorID = result.userID;
          this.userId = result.userID;
        }
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    var date = new Date();
    date = this.model.StartStream;
    date.setHours(parseInt(this.startTime.split(":")[0]) + 1, parseInt(this.startTime.split(":")[1]));
    this.model.StartStream = date;

    var date2 = new Date();
    date2 = this.model.EndStream;
    date2.setHours(parseInt(this.endTime.split(":")[0]) + 1, parseInt(this.endTime.split(":")[1]));
    this.model.EndStream = date2;

    this._roomService.addRoom(this.model)
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/home");
        },
        error: error => {
          this.loading = false;
        }
      }
      );
  }

  onSubmitModerator() {
    this._userService.getUserByEmail(this.moderatorEmail).subscribe(result => {
      //check if the given email is valid
      if (result) {
        this.isVerifiedModerator = true;
        this.isInvalidModerator = false;
        this.model.ModeratorID = result.userID;
      } else {
        this.isVerifiedModerator = false;
        this.isInvalidModerator = true;
      }
    });
  }

  onSubmitPresentator() {
    this._userService.getUserByEmail(this.presentatorEmail).subscribe(result => {
      if (result) {
        this.model.PresentatorID = result.userID;
        this.isVerifiedPresentator = true;
        this.isInvalidPresentator = false;
      } else {
        this.isVerifiedPresentator = false;
        this.isInvalidPresentator = true;
      }
    });
  }
}
