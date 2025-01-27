import { Navigation } from './../types';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { navigationItems } from './data';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink,  MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule, MatListModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   @ViewChild('navmenu') matDrawer? :ElementRef;
  navigation: Navigation[] = navigationItems;
  isMobileMenuOpen = false;

 toggleMobileMenu(event: any) {
   event.stopPropagation();
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (event.currentTarget.activeElement !== this.matDrawer?.nativeElement) {
      this.closeMobileMenu();
    }
  }
}
