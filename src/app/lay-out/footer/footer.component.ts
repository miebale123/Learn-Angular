import {
  Apple,
  Facebook,
  Instagram,
  Linkedin,
  LucideAngularModule,
  Play,
  Youtube,
} from 'lucide-angular';

import { Component } from '@angular/core';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule, MatIconModule,],
  template: `
    <footer class="bg-black text-white py-12">
      <div class="max-w-7xl mx-auto px-6">
        <!-- TOP LINKS -->
        <div class="flex flex-wrap gap-6 justify-center text-sm mb-10">
          <a href="#" class="hover:underline">About Us</a>
          <a href="#" class="hover:underline">Careers</a>
          <a href="#" class="hover:underline">Privacy</a>
          <a href="#" class="hover:underline">Terms</a>
          <a href="#" class="hover:underline">Contact</a>
        </div>

        <!-- SOCIAL ICONS -->
        <div class="flex justify-center gap-6 mb-10">
          <lucide-icon [img]="facebook" class="w-6 h-6 cursor-pointer"></lucide-icon>
          <lucide-icon [img]="insta" class="w-6 h-6 cursor-pointer"></lucide-icon>
          <lucide-icon [img]="youtube" class="w-6 h-6 cursor-pointer"></lucide-icon>
          <lucide-icon [img]="linkedIn" class="w-6 h-6 cursor-pointer"></lucide-icon>
        </div>

        <!-- COPYRIGHT -->
        <p class="text-center text-xs opacity-70">
          © {{ currentYear }} Lumina. All rights reserved.
        </p>
      </div>
    </footer>
  `,
})
export class Footer {
  facebook = Facebook;
  insta = Instagram;
  youtube = Youtube;
  linkedIn = Linkedin;

  playstore = Play;
  apple = Apple;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'apple',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/apple.svg')
    );

    iconRegistry.addSvgIcon(
      'playstore',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/playstore.svg')
    );
  }

  currentYear = new Date().getFullYear();
}
