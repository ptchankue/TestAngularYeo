import { TestBed } from '@angular/core/testing';
import { ClassicAbout } from './classic-about';

describe('ClassicAbout', () => {
  it('should expose a list of awesomeThings and render the notes form', async () => {
    TestBed.configureTestingModule({ imports: [ClassicAbout] });
    const fixture = TestBed.createComponent(ClassicAbout);
    await fixture.whenStable();
    expect(fixture.componentInstance.awesomeThings.length).toBe(3);
    expect((fixture.nativeElement as HTMLElement).querySelector('app-notes textarea')).toBeTruthy();
  });
});
