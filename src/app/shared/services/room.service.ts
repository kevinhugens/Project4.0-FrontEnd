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
  constructor(private http: HttpClient) { }
  
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl + "api/room");
  }

  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(this.apiUrl + "api/room/" + id);
  }
  
}
