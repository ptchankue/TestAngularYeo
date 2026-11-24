import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ModernHome, FEATURES } from './modern-home';

describe('ModernHome', () => {
  async function setup() {
    await TestBed.configureTestingModule({ imports: [ModernHome], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(ModernHome);
    return { fixture, home: fixture.componentInstance };
  }

  it('filters features with a computed signal', async () => {
    const { home } = await setup();
    expect(home.filtered().length).toBe(FEATURES.length);
    home.query.set('forms');
    expect(home.filtered().map((f) => f.id)).toEqual(['signal-forms']);
  });

  it('keeps the selection while it is visible and resets it when filtered out (linkedSignal)', async () => {
    const { home } = await setup();
    const zoneless = FEATURES.find((f) => f.id === 'zoneless')!;
    home.selected.set(zoneless);

    home.query.set('performance');
    expect(home.selected()?.id).toBe('zoneless');

    home.query.set('forms');
    expect(home.selected()?.id).toBe('signal-forms');
  });

  it('derives the doubled count', async () => {
    const { home } = await setup();
    home.count.set(7);
    expect(home.doubled()).toBe(14);
  });

  it('loads the selected release with resource()', async () => {
    vi.useFakeTimers();
    try {
      const { fixture, home } = await setup();
      home.version.set(19);
      fixture.detectChanges();
      await vi.advanceTimersByTimeAsync(0);
      expect(home.release.isLoading()).toBe(true);
      await vi.advanceTimersByTimeAsync(700);
      expect(home.release.value()?.version).toBe(19);
    } finally {
      vi.useRealTimers();
    }
  });
});
