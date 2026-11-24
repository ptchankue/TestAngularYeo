import { Component, inject } from '@angular/core';
import { ClassicAbout } from '../classic/about/classic-about';
import { ModernAbout } from '../modern/about/modern-about';
import { UiMode } from '../ui-mode';

@Component({
  selector: 'app-about-page',
  imports: [ClassicAbout, ModernAbout],
  template: `@if (ui.isModern()) { <app-modern-about /> } @else { <app-classic-about /> }`,
})
export class AboutPage {
  protected readonly ui = inject(UiMode);
}
