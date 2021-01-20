import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  apiUrl = environment.apiLink;
  selectedRoom: Room;
  constructor(private http: HttpClient) { }
  
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl + "api/room");
  }

  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(this.apiUrl + "api/room/" + id);
  }

  updateRoom(id: number, room: Room){
    return this.http.put<Room>(this.apiUrl + "api/room/" + id, room)
  }

  deleteRoom(id: number){
    return this.http.delete<Room>(this.apiUrl + "api/room/" + id)
  }
  
  addRoom(room: Room) {
    return this.http.post(this.apiUrl + "api/room/", room);
  }
  
}
