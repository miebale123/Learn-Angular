import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandleComponent } from '../../core/other/candle.component';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../lay-out/header/header.component';
import { Search } from '../../houses/search.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, CandleComponent, Header, RouterLink, Search],
  templateUrl: 'home.component.html',
})
export class Home {
  router = inject(Router);

  go(path: string) {
    this.router.navigateByUrl(path);
  }
}
