import { Component, ElementRef, inject, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import animationData from '../../../assets/programmer.json';
import { NavigationService } from '../../core/other/navigation.service';
import { CandleComponent } from '../../core/other/candle.component';
import { Router } from '@angular/router';
import { AuthStateService } from '../../core/auth/auth-state.service';
import { LogOut, Settings, UserIcon } from 'lucide-angular';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, CandleComponent],
  templateUrl: `./home.component.html`,
})
export class Home {
  private router = inject(Router);
  auth = inject(AuthStateService);

  UserIcon = UserIcon;
  LogOut = LogOut;
  Settings = Settings;

  go(path: string) {
    this.router.navigateByUrl(path);
  }

  logout() {
    localStorage.removeItem('access-token');
    this.auth.setLoggedIn(false);
    this.router.navigateByUrl('/auth/sign-in');
  }

  navigation = inject(NavigationService);
}
