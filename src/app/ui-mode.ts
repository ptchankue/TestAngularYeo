import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';

export type UiModeName = 'classic' | 'modern';

const STORAGE_KEY = 'testWebApp.ui-mode';

/** Which UI is shown: the original 2016 Bootstrap look, or the Angular 21 showcase. */
@Injectable({ providedIn: 'root' })
export class UiMode {
  private readonly document = inject(DOCUMENT);

  readonly mode = signal<UiModeName>(readStoredMode());
  readonly isModern = computed(() => this.mode() === 'modern');

  constructor() {
    effect(() => {
      const mode = this.mode();
      this.document.documentElement.dataset['ui'] = mode;
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // storage unavailable (private mode, etc.): the choice just won't persist
      }
    });
  }

  set(mode: UiModeName): void {
    this.mode.set(mode);
  }

  toggle(): void {
    this.mode.update((mode) => (mode === 'modern' ? 'classic' : 'modern'));
  }
}

function readStoredMode(): UiModeName {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'classic' ? 'classic' : 'modern';
  } catch {
    return 'modern';
  }
}
