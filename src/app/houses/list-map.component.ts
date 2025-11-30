import { Component } from '@angular/core';

@Component({
  selector: 'list-map',
  template: `
    <!-- LIST / MAP TOGGLE (UI ONLY) -->
    <div class="flex items-center ml-4 ">
      <div class="flex rounded-full py-1 px-1 bg-gray-100 shadow-inner">
        <button
          class="px-5 py-2 rounded-full text-sm font-medium transition
             text-gray-600"
          [class.bg-white]="viewMode === 'list'"
          [class.shadow]="viewMode === 'list'"
          [class.text-gray-900]="viewMode === 'list'"
          (click)="viewMode = 'list'"
        >
          List
        </button>

        <button
          class="px-5 py-2 rounded-full text-sm font-medium transition
             text-gray-600"
          [class.bg-white]="viewMode === 'map'"
          [class.shadow]="viewMode === 'map'"
          [class.text-gray-900]="viewMode === 'map'"
          (click)="viewMode = 'map'"
        >
          Map
        </button>
      </div>
    </div>


    
  `,
})
export class ListMap {
  viewMode: 'list' | 'map' = 'list';
}
