import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiLink;
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "api/user");
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + "api/user/" + id);
  }
  getUserByToken(token: String): Observable<User> {
    return this.http.get<User>(this.apiUrl + "api/user/token/" + token);
  }
}
