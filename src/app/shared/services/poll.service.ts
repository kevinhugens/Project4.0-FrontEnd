import { Injectable } from '@angular/core';
import { Poll } from '../models/poll.model';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PollService {
  apiUrl = environment.apiLink;
  roomID: number;
  
  constructor(private http: HttpClient) { }

  getPolls(): Observable<Poll[]>{
    return this.http.get<Poll[]>(this.apiUrl + "api/poll");
  }

  getPoll(id: number): Observable<Poll>{
    return this.http.get<Poll>(this.apiUrl + "api/poll/" + id);
  }

  updatePoll(id: number, poll: Poll){
    return this.http.put<Poll>(this.apiUrl + "api/poll/" + id, poll)
  }

  addPoll(poll: Poll){
    return this.http.post<Poll>(this.apiUrl + "api/poll" , poll);
  }

  deletePoll(id: number){
    return this.http.delete<Poll>(this.apiUrl + "api/poll/" + id)
  }

  getAllPollsByRoomID(roomID: number) {
    return this.http.get<Poll[]>(this.apiUrl + "api/poll/room/" + roomID);
  }
}
