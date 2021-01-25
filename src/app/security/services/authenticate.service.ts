import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/shared/models/user-login.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private userLogged = new BehaviorSubject(this.getCurrentUser());
  loggedUser = this.userLogged.asObservable();

  apiUrl = environment.apiLink;

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
    if (localStorage.getItem("token")) {
      var token = localStorage.getItem("token");
      this._userService.getUserByToken(token).subscribe((data: User) => {
        return this.logUser(data);
      });
    }
    else {
      return null;
    }
  }

  constructor(private _httpClient: HttpClient, private _userService: UserService) { }

  authenticate(userLogin: UserLogin): Observable<User> {
    return this._httpClient.post<User>(this.apiUrl + "api/User/authenticate", userLogin);
  }
}
