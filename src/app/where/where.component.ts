import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WeddingLocation } from '../types';
import { locations } from './data';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-where',
  imports: [CommonModule,
    MatExpansionModule,
    MatCardModule],
  templateUrl: './where.component.html',
  styleUrl: './where.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhereComponent {

  constructor(private sanitizer: DomSanitizer) {}
  
  weddingLocations: WeddingLocation[] = locations;
  isIframeVisible = false; // Zmienna kontrolująca widoczność iframe
  rotateClass = 'rotate-90';

  // To handle open event
  onPanelOpened(index: number): void {
    this.weddingLocations[index].isVisible = true;
  }

  // To handle close event
  onPanelClosed(index: number): void {
    this.weddingLocations[index].isVisible = false;
  }


  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
