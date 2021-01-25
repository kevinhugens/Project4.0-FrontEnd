import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserPoll } from '../models/user-poll.model';

@Injectable({
  providedIn: 'root'
})
export class UserPollService {
  apiUrl = environment.apiLink;
  selectedUserPoll: UserPoll;
  constructor(private http: HttpClient) { }
  
  getUserPolls(): Observable<UserPoll[]> {
    return this.http.get<UserPoll[]>(this.apiUrl + "api/userPoll");
  }

  getUserPoll(id: number): Observable<UserPoll> {
    return this.http.get<UserPoll>(this.apiUrl + "api/userPoll/" + id);
  }

  updateUserPoll(id: number, userPoll: UserPoll){
    return this.http.put<UserPoll>(this.apiUrl + "api/userPoll/" + id, userPoll)
  }

  deleteUserPoll(id: number){
    return this.http.delete<UserPoll>(this.apiUrl + "api/userPoll/" + id)
  }
  
  addUserPoll(userPoll: UserPoll) {
    return this.http.post(this.apiUrl + "api/userPoll/", userPoll);
  }
}
