import { Component, ElementRef, HostListener, inject, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HousesStore } from '../../houses/houses.store';
import { Search } from '../../houses/search.component';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';

@Component({
  selector: 'hero',
  imports: [Search, LucideAngularModule],
  template: `
    <main
      #heroRef
      class="flex flex-col justify-start items-center text-center gap-6 px-4
         text-white hero-section h-full py-28 z-[10]"
    >
      <h2 class="text-4xl font-bold ">Discover Homes That Match Your Lifestyle!</h2>

      <h2 class="text-lg font-bold">browse curated properties designed for elevated living.</h2>
      <p class="font-bold text-lg">የብርሃን ቤት ይሁንልዎ!</p>

      <div
        class="inset-x-0 mx-auto px-4 flex justify-center transition-all duration-300 "
        [class.fixed]="isFixed"
        [class.top-0]="isFixed"
        [class.left-0]="isFixed"
        [class.right-0]="isFixed"
        [class.w-full]="isFixed"
        [class.bg-white]="isFixed"
        [class.shadow-md]="isFixed"
        [class.max-w-4xl]="!isFixed"
      >
        <search-house (search)="onSearch($event)"></search-house>
      </div>
    </main>

    <!-- [class.absolute]="!isFixed"
        [class.bottom-8]="!isFixed" -->
  `,
})
export class Hero {
  private router = inject(Router);
  private store = inject(HousesStore);

  s = SearchIcon;

  @ViewChild('heroRef', { static: true }) heroRef!: ElementRef;

  isFixed = false;
  heroHeight = 0;

  ngAfterViewInit() {
    this.heroHeight = this.heroRef.nativeElement.offsetHeight;
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    this.isFixed = scrollY > this.heroHeight - 80; // adjust offset if wanted
  }

  onSearch(value: string) {
    this.store.set('searchLocation', value);
    this.router.navigateByUrl('/houses-search-results');
  }

  selected = 'Rent'; // default option — change if you want

  setSelected(option: string) {
    this.selected = option;
  }
}
