import { Component, inject } from '@angular/core';
import { ClassicHome } from '../classic/home/classic-home';
import { ModernHome } from '../modern/home/modern-home';
import { UiMode } from '../ui-mode';

@Component({
  selector: 'app-home-page',
  imports: [ClassicHome, ModernHome],
  template: `@if (ui.isModern()) { <app-modern-home /> } @else { <app-classic-home /> }`,
})
export class HomePage {
  protected readonly ui = inject(UiMode);
}
