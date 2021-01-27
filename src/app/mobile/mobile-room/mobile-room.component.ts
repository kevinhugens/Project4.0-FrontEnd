import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Room } from 'src/app/shared/models/room.model';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-mobile-room',
  templateUrl: './mobile-room.component.html',
  styleUrls: ['./mobile-room.component.scss']
})
export class MobileRoomComponent implements OnInit {
  roomId;
  room: Room = null;
  loading=true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _roomService: RoomService
  ) { 
  }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get("id"));
    this._roomService.getRoom(this.roomId).subscribe((result) => {
      if(result !== null){
        this.room = result;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    }); 
  }

}
