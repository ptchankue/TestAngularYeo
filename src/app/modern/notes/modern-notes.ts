import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormField, form, maxLength, required, submit, validate } from '@angular/forms/signals';

type Priority = 'low' | 'normal' | 'high';

interface NoteDraft {
  content: string;
  priority: Priority;
}

export interface Note extends NoteDraft {
  id: number;
  createdAt: Date;
}

export const MAX_NOTE_LENGTH = 280;
const EMPTY_DRAFT: NoteDraft = { content: '', priority: 'normal' };

/** Notes rebuilt with Signal Forms (experimental in Angular 21). */
@Component({
  selector: 'app-modern-notes',
  imports: [FormField, DatePipe],
  templateUrl: './modern-notes.html',
})
export class ModernNotes {
  readonly maxLength = MAX_NOTE_LENGTH;
  readonly priorities: Priority[] = ['low', 'normal', 'high'];

  /** The form model is a plain signal; the form reads and writes it directly. */
  readonly draft = signal<NoteDraft>({ ...EMPTY_DRAFT });

  readonly noteForm = form(this.draft, (path) => {
    required(path.content, { message: 'Write something first.' });
    validate(path.content, ({ value }) =>
      value() && !value().trim() ? { kind: 'blank', message: 'A note cannot be only spaces.' } : undefined,
    );
    maxLength(path.content, MAX_NOTE_LENGTH, { message: `Keep it under ${MAX_NOTE_LENGTH} characters.` });
  });

  readonly notes = signal<Note[]>([]);
  readonly remaining = computed(() => MAX_NOTE_LENGTH - this.draft().content.length);
  readonly highCount = computed(() => this.notes().filter((n) => n.priority === 'high').length);

  private nextId = 1;

  async add(event?: Event): Promise<void> {
    event?.preventDefault();
    await submit(this.noteForm, async () => {
      const { content, priority } = this.draft();
      this.notes.update((notes) => [
        { id: this.nextId++, content: content.trim(), priority, createdAt: new Date() },
        ...notes,
      ]);
      this.clear();
      return undefined;
    });
  }

  clear(): void {
    this.draft.set({ ...EMPTY_DRAFT });
    this.noteForm().reset();
  }

  remove(id: number): void {
    this.notes.update((notes) => notes.filter((n) => n.id !== id));
  }
}
