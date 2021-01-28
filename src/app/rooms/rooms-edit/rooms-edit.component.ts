import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/shared/models/room.model';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-rooms-edit',
  templateUrl: './rooms-edit.component.html',
  styleUrls: ['./rooms-edit.component.scss']
})
export class RoomsEditComponent implements OnInit {
  room: Room;
  startTime: String;
  endTime: String;
  linkPattern = "^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$"
  constructor(private router: Router,
    private _roomService: RoomService,) { }

  ngOnInit(): void {
    if(this._roomService.selectedRoom != null) {
      this.room = this._roomService.selectedRoom;
      var startUur = this.room['startStream'].split("T")[1];
      var res = startUur.split(":")[0] + ':' + startUur.split(":")[1];
      this.startTime = res;

      var endUur = this.room['endStream'].split("T")[1];
      var res2 = endUur.split(":")[0] + ':' + endUur.split(":")[1];
      this.endTime = res2;
    }
  }

  onSubmit () {
    var date = new Date(Date.parse(this.room['startStream']));
    date.setHours(parseInt(this.startTime.split(":")[0]) + 1, parseInt(this.startTime.split(":")[1]));
    this.room.StartStream = date;

    var date2 = new Date(Date.parse(this.room['endStream']));
    date2.setHours(parseInt(this.endTime.split(":")[0]) + 1, parseInt(this.endTime.split(":")[1]));
    this.room.EndStream = date2;

    this._roomService.updateRoom(this.room["roomID"],this.room)
    .subscribe((result) => {
      this.router.navigateByUrl("/home");
    });
   }

}
