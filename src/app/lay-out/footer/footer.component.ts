import { Facebook, Instagram, Linkedin, LucideAngularModule, Youtube } from 'lucide-angular';

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  template: ` <!-- Footer -->
    <footer class="bg-black text-white py-8">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex flex-col sm:flex-row sm:justify-between items-center gap-6">
          <!-- Logo / Name -->
          <!-- Logo -->
          <a routerLink="/">
            <div class="flex items-center gap-2 justify-center">
              <img src="../../../assets/HomeLogo.png" alt="" class="w-6 h-6" />
              <div class="md:flex">
                <span class="text-xl font-bold mt-1">Lumina</span>
              </div>
            </div>
          </a>

          <!-- Social Icons -->
          <div class="flex gap-6">
            <lucide-icon [img]="facebook" class="w-5 h-5 cursor-pointer"></lucide-icon>
            <lucide-icon [img]="insta" class="w-5 h-5 cursor-pointer"></lucide-icon>
            <lucide-icon [img]="youtube" class="w-5 h-5 cursor-pointer"></lucide-icon>
            <lucide-icon [img]="linkedIn" class="w-5 h-5 cursor-pointer"></lucide-icon>
          </div>
        </div>

        <div class="text-center text-sm mt-6 opacity-70">
          © {{ currentYear }} Lumina. All rights reserved.
        </div>
      </div>
    </footer>`,
})
export class Footer {
  facebook = Facebook;
  insta = Instagram;
  youtube = Youtube;
  linkedIn = Linkedin;

  currentYear = new Date().getFullYear();
}
