import { ChangeDetectionStrategy, Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-how',
  imports: [],
  templateUrl: './how.component.html',
  styleUrl: './how.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowComponent {

  constructor(private sanitizer: DomSanitizer) {
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
