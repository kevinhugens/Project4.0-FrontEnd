import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/services/user.service'
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

@Component({
  selector: 'app-mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.scss']
})
export class MobileHomeComponent implements OnInit {
  @ViewChild('scanner',{static:true, read: false})
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }
  

  onCodeResult(resultString: String) {
    //this._userService.getUserByToken(resultString).subscribe((data) => {
      //console.log(data);
   // });
   alert(resultString);
  }
}
