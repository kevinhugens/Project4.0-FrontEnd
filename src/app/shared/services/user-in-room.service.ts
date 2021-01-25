import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInRoom } from '../models/user-in-room.model';

@Injectable({
  providedIn: 'root'
})
export class UserInRoomService {
  apiUrl = environment.apiLink;
  
  constructor(private http: HttpClient) { }
  
  getUserInRooms(): Observable<UserInRoom[]> {
    return this.http.get<UserInRoom[]>(this.apiUrl + "api/userInRoom");
  }

  getUserInRoom(id: number): Observable<UserInRoom> {
    return this.http.get<UserInRoom>(this.apiUrl + "api/userInRoom/" + id);
  }

  getAllUsersInRoom(roomid: number): Observable<UserInRoom[]> {
    return this.http.get<UserInRoom[]>(this.apiUrl + "api/userInRoom/room/"+roomid);
  }

  updateUserInRoom(id: number, userInRoom: UserInRoom){
    return this.http.put<UserInRoom>(this.apiUrl + "api/userInRoom/" + id, userInRoom)
  }

  deleteUserInRoom(id: number){
    return this.http.delete<UserInRoom>(this.apiUrl + "api/userInRoom/" + id)
  }
  
  addUserInRoom(userInRoom: UserInRoom) {
    return this.http.post(this.apiUrl + "api/userInRoom/", userInRoom);
  }
}
