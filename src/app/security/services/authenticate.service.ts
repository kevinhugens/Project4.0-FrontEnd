import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/shared/models/user-login.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private userLogged = new BehaviorSubject(this.getCurrentUser());
  loggedUser = this.userLogged.asObservable();
  currentUser: User;

  logUser(user: User) {
    this.userLogged.next(user);
  }

  isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
  getCurrentUser() {
    if (localStorage.getItem("currentUser")) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      return JSON.parse(localStorage.getItem("currentUser"));
    }
    else {
      return null;
    }
  }

  constructor(private _httpClient: HttpClient) { }

  authenticate(userLogin: UserLogin): Observable<User> {
    console.log("Authenticate");
    console.log(userLogin)
    return this._httpClient.post<User>("https://localhost:44333/api/User/authenticate", userLogin);
  }
}
