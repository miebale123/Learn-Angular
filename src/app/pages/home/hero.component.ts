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
      <p class="font-bold text-3xl">Lumina House</p>

      <p class="font-bold text-lg">የብርሃን ቤት ይሁንልዎ!</p>

      <div class="inset-x-0 mx-auto px-4 flex justify-center transition-all duration-300 ">
        <search-house></search-house>
      </div>
      <div class="font-semibold text-lg flex items-center gap-2 relative">
        <lucide-icon [name]="s" class="w-5 h-5 text-white"></lucide-icon>
      </div>
    </main>
  `,
})
export class Hero {
  private router = inject(Router);
  private store = inject(HousesStore);

  s = SearchIcon;
}
