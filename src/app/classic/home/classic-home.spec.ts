import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ClassicHome } from './classic-home';

describe('ClassicHome', () => {
  it('should expose a list of awesomeThings', () => {
    TestBed.configureTestingModule({ imports: [ClassicHome], providers: [provideRouter([])] });
    const home = TestBed.createComponent(ClassicHome).componentInstance;
    expect(home.awesomeThings.length).toBe(3);
  });
});
