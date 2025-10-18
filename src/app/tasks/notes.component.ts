import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

function randomNo() {
  return Math.floor(Math.random() * 100000);
}

interface Note {
  id: number;
  title: string;
}

@Component({
  selector: 'app-notes',
  imports: [ReactiveFormsModule],
  template: ` <div>
    <div class="flex gap-20">
      <button (click)="createNewNote()">new note</button>

      <ul class="border-r w-1/4">
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


export class NotesComponent {
  id = signal<number>(randomNo());
  title = signal<string>('new page');
  note = signal<Note>({ id: this.id(), title: this.title() });
  notes = signal<Note[]>([this.note()]);
  // allowNewNote = signal<boolean>(true);

  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [this.id()],
    title: [this.title()],
  });

  createNewNote() {
    this.id.set(randomNo());
    console.log(this.id());
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
}

// @Component({
//   selector: 'app-notes',
//   imports: [ReactiveFormsModule],
//   template: `
//     <form [formGroup]="form" (ngSubmit)="createNote()">
//       <input type="text" formControlName="title" />
//       <button type="submit">create-note</button>
//     </form>

//     <button (click)="getNoteById()" class="bg-white text-black">find</button>

//     <button (click)="changeTitle()">changeTitle</button>
//   `,
// })
// export class NotesComponent {
//   private http = inject(HttpClient);

//   id = signal<number>(0);
//   title = signal<string>('');

//   fb = inject(FormBuilder);
//   form: FormGroup = this.fb.group({
//     title: [this.title()],
//   });

//   async createNote() {
//     const dto = this.form.value;
//     const res: any = await firstValueFrom(
//       this.http.post('http://localhost:4442/notes/create-note', dto)
//     );
//     console.log(res);

//     this.title.set(dto);
//     this.id.set(res?.id);
//   }

//   async getNoteById() {
//     const id = this.id();
//     const res = await firstValueFrom(this.http.get(`http://localhost:4442/notes/${id}`));
//     console.log(res)
//   }

//   changeTitle() {
//     this.title.set('change title');
//     this.form.setValue({ title: this.title() });
//   }
// }

