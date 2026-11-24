import { TestBed } from '@angular/core/testing';
import { UiMode } from './ui-mode';

describe('UiMode', () => {
  beforeEach(() => localStorage.clear());

  it('defaults to the modern UI', () => {
    expect(TestBed.inject(UiMode).mode()).toBe('modern');
  });

  it('restores the stored choice', () => {
    localStorage.setItem('testWebApp.ui-mode', 'classic');
    expect(TestBed.inject(UiMode).isModern()).toBe(false);
  });

  it('toggles, persists and flags the <html> element', () => {
    const ui = TestBed.inject(UiMode);
    ui.toggle();
    TestBed.tick();
    expect(ui.mode()).toBe('classic');
    expect(localStorage.getItem('testWebApp.ui-mode')).toBe('classic');
    expect(document.documentElement.dataset['ui']).toBe('classic');
  });
});
