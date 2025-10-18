import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './lay-out/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <div class="min-h-screen flex flex-col  ">
      <app-header></app-header>

      <main class="flex-1 overflow-auto p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppLayoutComponent {}
