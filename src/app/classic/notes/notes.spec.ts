import { TestBed } from '@angular/core/testing';
import { Notes } from './notes';

describe('Notes', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [Notes] });
    const fixture = TestBed.createComponent(Notes);
    return { fixture, notes: fixture.componentInstance };
  }

  it('adds a note and resets the field', () => {
    const { notes } = setup();
    notes.content.setValue('  Buy milk  ');
    notes.createNote();
    expect(notes.notes()).toEqual(['Buy milk']);
    expect(notes.content.value).toBe('');
  });

  it('ignores empty notes', () => {
    const { notes } = setup();
    notes.content.setValue('   ');
    notes.createNote();
    expect(notes.notes()).toEqual([]);
    expect(notes.content.touched).toBe(true);
  });

  it('clear() empties the field without touching existing notes', () => {
    const { notes } = setup();
    notes.content.setValue('first');
    notes.createNote();
    notes.content.setValue('draft');
    notes.clear();
    expect(notes.content.value).toBe('');
    expect(notes.notes()).toEqual(['first']);
  });

  it('renders added notes', async () => {
    const { fixture, notes } = setup();
    notes.content.setValue('Rendered note');
    notes.createNote();
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('.list-group-item')?.textContent).toContain(
      'Rendered note',
    );
  });
});
