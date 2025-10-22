import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Note } from '../../notes/note.component';

@Component({
  selector: 'dashboard',
  template: `
    <div>
      @for (note of notes(); track $index) {
      <section>{{ note?.title }}</section>
      }
    </div>
  `,
})
export class DashBoard {
  private http = inject(HttpClient);
  notes = signal<Note[]>([]);

  async ngOnInit() {
    const res: any = await firstValueFrom(this.http.get(`http://localhost:4442/notes`));
    this.notes.set(res);
  }
}
