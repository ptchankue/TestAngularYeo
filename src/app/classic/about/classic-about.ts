import { Component } from '@angular/core';
import { Notes } from '../notes/notes';

@Component({
  selector: 'app-classic-about',
  imports: [Notes],
  templateUrl: './classic-about.html',
})
export class ClassicAbout {
  readonly awesomeThings = ['HTML5 Boilerplate', 'Angular', 'Vitest'];
}
