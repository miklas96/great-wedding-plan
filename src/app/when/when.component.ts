import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-when',
  imports: [CommonModule],
  templateUrl: './when.component.html',
  styleUrl: './when.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhenComponent {
  schedule = [
    { time: '15:00', event: 'Przyjazd gości' },
    { time: '15:30', event: 'Ceremonia ślubna' },
    { time: '16:30', event: 'Gratulacje i sesja zdjęciowa' },
    { time: '17:30', event: 'Obiad weselny' },
    { time: '20:00', event: 'Pierwszy taniec' },
    { time: '21:00', event: 'Zabawa taneczna' },
    { time: '23:30', event: 'Tort weselny' },
    { time: '01:00', event: 'Zakończenie imprezy' }
  ];

}
