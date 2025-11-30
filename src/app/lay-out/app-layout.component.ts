import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer.component';
import { Header, } from './header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header />
      <main class="flex-1 ">
        <router-outlet></router-outlet>
      </main>

      <app-footer />
    </div>

    <!-- overflow-y-auto -->
  `,
})
export class AppLayout {}
