import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandleComponent } from '../../core/other/candle.component';
import { Router } from '@angular/router';
import { Header } from '../../lay-out/header/header.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, CandleComponent, Header],
  templateUrl: `./home.component.html`,
})
export class Home {
  router = inject(Router);


  go(path: string) {
    this.router.navigateByUrl(path);
  }
}
