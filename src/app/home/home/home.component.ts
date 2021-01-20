import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/shared/models/room.model';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rooms: Room[] = [];
  constructor(private _roomService: RoomService) {
    _roomService.getRooms().subscribe((result) => {
      this.rooms = result;
    })
  }

  ngOnInit(): void {
  }

}
