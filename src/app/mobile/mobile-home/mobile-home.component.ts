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
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;

      // selects the devices's back camera by default
      for (const device of devices) {
          if (/back|rear|environment/gi.test(device.label)) {
              this.currentDevice = device;
              break;
          }
      }
    });

    this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  onCodeResult(resultString: String) {
    //this._userService.getUserByToken(resultString).subscribe((data) => {
      //console.log(data);
   // });
   alert(resultString);
  }
}
