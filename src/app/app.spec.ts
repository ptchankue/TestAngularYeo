import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { UiMode } from './ui-mode';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  function navLinks(el: HTMLElement, selector: string): string[] {
    return Array.from(el.querySelectorAll(selector)).map((a) => a.textContent?.trim() ?? '');
  }

  it('renders the modern shell by default', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.m-app')).toBeTruthy();
    expect(navLinks(el, '.m-nav a')).toEqual(['Home', 'About']);
  });

  it('switches to the classic shell and back', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    (el.querySelector('.m-switch button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(el.querySelector('.m-app')).toBeNull();
    expect(navLinks(el, '.nav-link')).toEqual(['Home', 'About', 'Contact']);

    (el.querySelector('.navbar .btn') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(TestBed.inject(UiMode).isModern()).toBe(true);
    expect(el.querySelector('.m-app')).toBeTruthy();
  });
});
