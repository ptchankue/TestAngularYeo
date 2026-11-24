import { TestBed } from '@angular/core/testing';
import { ModernNotes, MAX_NOTE_LENGTH } from './modern-notes';

describe('ModernNotes (Signal Forms)', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [ModernNotes] });
    const fixture = TestBed.createComponent(ModernNotes);
    return { fixture, notes: fixture.componentInstance, el: fixture.nativeElement as HTMLElement };
  }

  it('binds the textarea to the draft signal', async () => {
    const { fixture, notes, el } = setup();
    await fixture.whenStable();
    const textarea = el.querySelector('textarea')!;
    textarea.value = 'typed';
    textarea.dispatchEvent(new Event('input'));
    expect(notes.draft().content).toBe('typed');
  });

  it('adds a valid note and resets the form', async () => {
    const { notes } = setup();
    notes.draft.set({ content: '  Ship it  ', priority: 'high' });
    await notes.add();
    expect(notes.notes().map((n) => [n.content, n.priority])).toEqual([['Ship it', 'high']]);
    expect(notes.draft()).toEqual({ content: '', priority: 'normal' });
    expect(notes.highCount()).toBe(1);
  });

  it('rejects empty, blank and too-long notes', async () => {
    const { notes } = setup();
    for (const content of ['', '   ', 'x'.repeat(MAX_NOTE_LENGTH + 1)]) {
      notes.draft.set({ content, priority: 'normal' });
      await notes.add();
    }
    expect(notes.notes()).toEqual([]);
    expect(notes.noteForm.content().invalid()).toBe(true);
  });

  it('shows validation messages after a failed submit', async () => {
    const { fixture, notes, el } = setup();
    await notes.add();
    await fixture.whenStable();
    expect(el.querySelector('.m-error')?.textContent).toContain('Write something first.');
  });

  it('removes a note', async () => {
    const { notes } = setup();
    notes.draft.set({ content: 'a', priority: 'low' });
    await notes.add();
    notes.remove(notes.notes()[0].id);
    expect(notes.notes()).toEqual([]);
  });
});
