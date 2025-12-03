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
      <p class="text-xl sm:text-2xl md:text-3xl font-bold pt-8">Rentals. Homes. Agents.</p>

      <div class="flex gap-6 text-lg font-semibold pt-4">
        <button class="pb-1 relative" (click)="setSelected('Buy')">
          Buy @if (selected === 'Buy') {
          <span class="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
          }
        </button>

        <button class="pb-1 relative" (click)="setSelected('Rent')">
          Rent @if (selected === 'Rent') {
          <span class="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
          }
        </button>

        <button class="pb-1 relative" (click)="setSelected('Sell')">
          Sell @if (selected === 'Sell') {
          <span class="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
          }
        </button>

        <button class="pb-1 relative" (click)="setSelected('Just sold')">
          Just sold @if (selected === 'Just sold') {
          <span class="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
          }
        </button>
      </div>

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
        <search-house (search)="onSearch($event)" [trySuggestion]="false"></search-house>
      </div>
      <div class="font-semibold text-lg flex items-center gap-2 relative">
        <!-- <div class="relative inline-block">
          <lucide-icon [name]="s" class="w-5 h-5 text-white"></lucide-icon>

          <img src="/assets/upper.png" alt="" class="absolute -top-1 -right-1 w-3 h-3" />
        </div> -->

        <!-- <span>Search it how you would say it.</span> -->
        <!-- <button class="underline">try it</button> -->
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
