import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Counter } from './counter';

@Component({
  imports: [Counter],
  template: `<app-counter [(value)]="count" [step]="5" />`,
})
class Host {
  readonly count = signal(10);
}

describe('Counter', () => {
  it('writes back to the parent signal through model()', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const [minus, plus] = (fixture.nativeElement as HTMLElement).querySelectorAll('button');

    plus.click();
    plus.click();
    minus.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.count()).toBe(15);
    expect((fixture.nativeElement as HTMLElement).querySelector('output')?.textContent).toBe('15');
  });
});
