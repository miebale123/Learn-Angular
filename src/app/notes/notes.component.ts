import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first, firstValueFrom } from 'rxjs';

function randomNo() {
  return Math.floor(Math.random() * 100000);
}

interface Note {
  id: number;
  title: string;
}

@Component({
  selector: 'notes',
  imports: [ReactiveFormsModule],
  template: ` <div>
    <div class="flex gap-20">
      <button (click)="createNewNote()">new note</button>

      <ul class="border-r w-1/4 flex flex-col">
        @for (n of notes(); track $index) {
        <button (click)="selectedNote(n.id)">{{ n.title || 'new page' }}</button>
        }
      </ul>

      <form [formGroup]="form">
        <input type="text" formControlName="title" />
      </form>
    </div>
  </div>`,
})
export class Notes {
  id = signal<number>(randomNo());
  title = signal<string>('new page');
  note = signal<Note>({ id: this.id(), title: this.title() });
  notes = signal<Note[]>([this.note()]);

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [this.id()],
    title: [this.title()],
  });

  async createNewNote() {
    this.id.set(randomNo());
    const title = this.form.value;
    localStorage.setItem('id', JSON.stringify(this.id()));
    localStorage.setItem('title', this.title());
    this.title.set('new page');
    this.note.set({ id: this.id(), title: this.title() });
    this.notes.update((prev) => [...prev, this.note()]);
  }

  selectedNote(id: number) {
    const n = this.notes().find((note) => note.id === id);
    if (n) {
      this.note.set(n); // update the "current note"
      this.form.setValue({ id: n.id, title: n.title }); // update the input
    }
  }

  ngOnInit() {
    this.form.get('title')?.valueChanges.subscribe((val) => {
      this.note.update((data) => ({ ...data, title: val }));

      this.notes.update((all) => {
        const exists = all.some((n) => n.id === this.note().id);
        console.log(exists);
        console.log(this.note().id);
        return exists
          ? all.map((n) => (n.id === this.note().id ? this.note() : n))
          : [...all, this.note()];
      });
    });
  }

  async getAllNotes() {
    const res: any = await firstValueFrom(this.http.get('http://localhost:4442/notes'));
    console.log(res);
  }
}

// @Component({
//   selector: 'notes',
//   imports: [ReactiveFormsModule],
//   template: `
//     <div>
//       @for (Note of notes; track $index) {
//       <button>{{ note.title || 'untitled' }}</button>

//       }

//       <form [formGroup]="form" (ngSubmit)="createNote()">
//         <input type="text" formControlName="title" />
//         <button type="submit">create note</button>
//       </form>

//       <button (click)="getAllNotes()">get notes</button>
//     </div>
//   `,
// })
// export class Notes{
//   id = signal<number>(0);
//   title = signal<string>('');
//   note = <Note>{ id: this.id(), title: this.title() };
//   notes = <Note[]>[];

//   http = inject(HttpClient);
//   fb = inject(FormBuilder);
//   form: FormGroup = this.fb.group({
//     id: [this.id()],
//     title: [this.title()],
//   });

//   async createNote() {
//     const dto = this.form.value;
//     const res: any = await firstValueFrom(
//       this.http.article(`http://localhost:4442/notes/create-note`, dto)
//     );

//     console.log(res);
//   }

//   async getNotes() {
//     const res: any = await firstValueFrom(this.http.get('http://localhost:4442/notes/getNotes'));
//     console.log(res);
//   }

// }
