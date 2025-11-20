import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, LucideAngularModule],
  template: `
    <div class="min-h-screen flex flex-col bg-blue-500 text-white">
      <div>
        <app-header></app-header>
        <main class="flex-1 pt-16 pb-8 px-4 sm:px-6 md:px-8 overflow-y-auto ">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class AppLayout {}
