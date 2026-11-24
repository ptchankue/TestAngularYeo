import { Component, input, output } from '@angular/core';

export interface Feature {
  id: string;
  name: string;
  tag: string;
  summary: string;
  since: number;
}

/** Signal-based component API: input.required(), input() and output(). */
@Component({
  selector: 'app-feature-card',
  host: {
    role: 'listitem',
  },
  template: `
    <button type="button" class="m-card m-feature" [class.is-selected]="selected()" (click)="pick.emit(feature())">
      <span class="m-tag">{{ feature().tag }}</span>
      <strong>{{ feature().name }}</strong>
      <small>since v{{ feature().since }}</small>
    </button>
  `,
})
export class FeatureCard {
  readonly feature = input.required<Feature>();
  readonly selected = input(false);
  readonly pick = output<Feature>();
}
