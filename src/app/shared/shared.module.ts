import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared/shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {ChartModule} from 'primeng/chart';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Error404Component } from './error404/error404.component';
@NgModule({
  declarations: [SharedComponent, Error404Component],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgxMaterialTimepickerModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ChartModule,
    MatButtonToggleModule
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgxMaterialTimepickerModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ChartModule,
    MatButtonToggleModule
  ]
})
export class SharedModule { }
