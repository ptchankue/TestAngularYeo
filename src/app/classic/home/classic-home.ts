import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-classic-home',
  imports: [RouterLink],
  templateUrl: './classic-home.html',
})
export class ClassicHome {
  readonly awesomeThings = ['HTML5 Boilerplate', 'Angular', 'Vitest'];
}
