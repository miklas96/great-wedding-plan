import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-photos',
  imports: [QRCodeComponent],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent {
  qrData = 'https://photos.app.goo.gl/Tutbzz1HDWXwwiAw5';
}
