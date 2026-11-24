import { Component, computed, linkedSignal, resource, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Counter } from '../counter/counter';
import { DeferredPanel } from '../deferred-panel/deferred-panel';
import { Feature, FeatureCard } from '../feature-card/feature-card';
import { RELEASES, fetchRelease } from './releases';

export const FEATURES: Feature[] = [
  { id: 'signals', name: 'Signals', tag: 'Reactivity', since: 16, summary: 'Reactive values with signal(), computed() and effect(). Angular re-renders only what read a changed signal.' },
  { id: 'linked', name: 'linkedSignal()', tag: 'Reactivity', since: 19, summary: 'Writable state derived from another signal. The selected card on this page is one: it resets when the filter hides it.' },
  { id: 'resource', name: 'resource()', tag: 'Async', since: 19, summary: 'Async data exposed as signals, with value(), isLoading(), error() and reload(). Requests are cancelled when params change.' },
  { id: 'io', name: 'input() / output() / model()', tag: 'Components', since: 17, summary: 'Signal-based component APIs. model() enables two-way binding, as in the counter below.' },
  { id: 'control-flow', name: '@if / @for / @let', tag: 'Templates', since: 17, summary: 'Built-in control flow and template-local variables, with no structural directives or imports needed.' },
  { id: 'defer', name: '@defer', tag: 'Performance', since: 17, summary: 'Lazy-loads part of a template, and its code, on viewport, idle, hover, interaction or a timer.' },
  { id: 'zoneless', name: 'Zoneless', tag: 'Performance', since: 21, summary: 'No zone.js. Change detection is triggered by signals, template events and markForCheck. It is the default for new apps in v21.' },
  { id: 'signal-forms', name: 'Signal Forms', tag: 'Forms', since: 21, summary: 'Experimental. form(), the [formField] directive and schema validators, with the form model stored in a signal. Try it on the About page.' },
  { id: 'vitest', name: 'Vitest', tag: 'Tooling', since: 21, summary: 'The default unit test runner for new projects, replacing Karma and Jasmine.' },
  { id: 'view-transitions', name: 'View transitions', tag: 'Router', since: 17, summary: 'withViewTransitions() animates route changes with the browser View Transitions API.' },
];

@Component({
  selector: 'app-modern-home',
  imports: [RouterLink, Counter, FeatureCard, DeferredPanel],
  templateUrl: './modern-home.html',
})
export class ModernHome {
  // --- signals, computed, linkedSignal ---
  readonly features = FEATURES;
  readonly query = signal('');
  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    return q
      ? this.features.filter((f) => `${f.name} ${f.tag} ${f.summary}`.toLowerCase().includes(q))
      : this.features;
  });
  /** Follows the filter: if the current pick is filtered out, fall back to the first match. */
  readonly selected = linkedSignal<Feature[], Feature | undefined>({
    source: this.filtered,
    computation: (list, previous) =>
      previous && list.some((f) => f.id === previous.value?.id) ? previous.value : list[0],
  });

  // --- model() two-way binding ---
  readonly count = signal(3);
  readonly doubled = computed(() => this.count() * 2);

  // --- resource() ---
  readonly versions = RELEASES.map((r) => r.version);
  readonly version = signal(21);
  readonly release = resource({
    params: () => this.version(),
    loader: ({ params, abortSignal }) => fetchRelease(params, abortSignal),
  });
}
