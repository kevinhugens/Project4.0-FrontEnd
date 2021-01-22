import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service'
@Component({
  selector: 'app-mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.scss']
})
export class MobileHomeComponent implements OnInit {

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

  onCodeResult(resultString: String) {
    this._userService.getUserByToken(resultString).subscribe((data) => {
      console.log(data);
    });
  }
}
