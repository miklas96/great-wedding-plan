import { Navigation } from './../types';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { navigationItems } from './data';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  navigation: Navigation[] = navigationItems;
   isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }



}
