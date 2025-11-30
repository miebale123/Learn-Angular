import { Component, ElementRef, HostListener, inject, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HousesStore } from '../../houses/houses.store';
import { Search } from '../../houses/search.component';

@Component({
  selector: 'hero',
  imports: [Search],
  template: `
    <div class=" w-full ">
      <main
        #heroRef
        class="flex flex-col justify-start items-center text-center gap-6 px-4
               text-white hero-section h-full py-28"
      >
        <p class="text-xl sm:text-2xl md:text-3xl font-bold pt-20">Rentals. Homes. Agents.</p>
        <p class="font-bold text-2xl">የብርሃን ቤት ይሁንልዎ!</p>

        <div
          class="inset-x-0 mx-auto px-4 flex justify-center transition-all duration-300 z-[20]"
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
      </main>
    </div>

    <!-- [class.absolute]="!isFixed"
        [class.bottom-8]="!isFixed" -->
  `,
  styles: [],
})
export class Hero {
  private router = inject(Router);
  private store = inject(HousesStore);

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
}
