import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../lay-out/header/header.component';
import { Search } from '../../houses/search.component';
import { HousesStore } from '../../houses/houses.store';
import { Footer } from '../../lay-out/footer/footer.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, Header, RouterLink, Search, Footer],
  templateUrl: 'home.component.html',
})
export class Home {
  router = inject(Router);

  go(path: string) {
    this.router.navigateByUrl(path);
  }

  store = inject(HousesStore);

  onSearch(searchValue: string) {
    this.store.set('searchLocation', searchValue); // store the search term
    this.router.navigateByUrl('/houses'); // go to houses page
  }

  done() {}
}
