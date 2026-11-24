import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Only referenced inside an @defer block, so it ships as a separate chunk that is
 * downloaded when the block scrolls into view.
 */
@Component({
  selector: 'app-deferred-panel',
  imports: [DatePipe],
  template: `
    <div class="m-stats">
      <div>
        <span class="m-stat__label">Chunk loaded at</span>
        <span class="m-stat__value">{{ loadedAt | date: 'HH:mm:ss' }}</span>
      </div>
      <div>
        <span class="m-stat__label">Live clock (signal + setInterval)</span>
        <span class="m-stat__value">{{ now() | date: 'HH:mm:ss' }}</span>
      </div>
      <div>
        <span class="m-stat__label">zone.js on this page</span>
        <span class="m-stat__value">{{ zoneLoaded ? 'loaded' : 'not loaded' }}</span>
      </div>
    </div>
    <p class="m-muted">
      There is no zone.js here: the clock re-renders because <code>now</code> is a signal, so Angular knows exactly what changed.
    </p>
  `,
})
export class DeferredPanel {
  readonly loadedAt = new Date();
  readonly now = signal(new Date());
  readonly zoneLoaded = typeof (globalThis as { Zone?: unknown }).Zone !== 'undefined';

  constructor() {
    const id = setInterval(() => this.now.set(new Date()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
