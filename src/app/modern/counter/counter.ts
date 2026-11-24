import { Component, input, model } from '@angular/core';

/** model() gives a signal-based two-way binding: <app-counter [(value)]="count" />. */
@Component({
  selector: 'app-counter',
  template: `
    <div class="m-counter">
      <button type="button" aria-label="Decrease" (click)="value.update((v) => v - step())">−</button>
      <output aria-live="polite">{{ value() }}</output>
      <button type="button" aria-label="Increase" (click)="value.update((v) => v + step())">+</button>
    </div>
  `,
})
export class Counter {
  readonly value = model(0);
  readonly step = input(1);
}
