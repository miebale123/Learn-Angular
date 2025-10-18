import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { number } from 'zod';

@Component({
  selector: 'app-notes/:id',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="createNote()">
      <input type="text" />
      <button>create note</button>
    </form>
  `,
})
export class NoteComponent {
  http = inject(HttpClient);
  id = signal<number>(0);
  title = signal<string>('');

  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    id: [this.id()],
    title: [this.title()],
  });

  createNote() {
    const dto = this.form.value;
    const res: any = firstValueFrom(this.http.post(`http://localhost:4442/`, dto));
  }
}
