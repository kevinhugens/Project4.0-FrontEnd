import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Room} from 'src/app/shared/models/room.model'
import {RoomService} from 'src/app/shared/services/room.service'
import { AuthenticateService } from 'src/app/security/services/authenticate.service';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.component.html',
  styleUrls: ['./rooms-create.component.scss']
})
export class RoomsCreateComponent implements OnInit {


  model : Room;
  loading = false;
  submitted = false;

  startTime: String;
  endTime: String;
  constructor(
    private router: Router,
    private _roomService: RoomService,
    private _authenticateService: AuthenticateService) { }

    ngOnInit(): void {
      this.model = new Room();
      this._authenticateService.loggedUser.subscribe(
        result => {
          if(result) {
            this.model.PresentatorID = result.userID;
          }
          
        }
      );
    }



  onSubmit () {
    this.submitted = true;
    //check some stuff
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
      }}
    );
   }


}
