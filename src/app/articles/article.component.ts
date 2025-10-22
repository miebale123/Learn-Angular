import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

interface LumenArticle {
  title: string;
}

@Component({
  selector: 'article',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="article()">
      <input type="text" formControlName="title" class="bg-gray-200 text-black" />
      <button type="submit">post</button>
    </form>
  `,
})
export class Article {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    title: [localStorage.getItem('draft-title') || ''],
  });

  ngOnInit() {
    this.form.get('title')?.valueChanges.subscribe((val) => {
      localStorage.setItem('draft-title', val);
    });
  }

  async article() {
    if (!this.form.value.title.trim()) return;

    const dto: LumenArticle = this.form.value;
    const res: any = await firstValueFrom(
      this.http.post(`http://localhost:4442/articles/create-article`, dto)
    );

    console.log('Articleed:', res);
    localStorage.removeItem('draft-title');
    this.form.reset({ title: '' });
  }
}
