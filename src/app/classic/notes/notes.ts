import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes',
  imports: [ReactiveFormsModule],
  templateUrl: './notes.html',
})
export class Notes {
  readonly content = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  readonly notes = signal<string[]>([]);

  createNote(): void {
    const text = this.content.value.trim();
    if (!text) {
      this.content.markAsTouched();
      return;
    }
    this.notes.update((notes) => [...notes, text]);
    this.content.reset();
  }

  clear(): void {
    this.content.reset();
  }
}
