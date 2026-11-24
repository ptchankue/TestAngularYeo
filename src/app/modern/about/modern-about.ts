import { Component } from '@angular/core';
import { ModernNotes } from '../notes/modern-notes';

@Component({
  selector: 'app-modern-about',
  imports: [ModernNotes],
  template: `
    <section class="m-hero m-hero--small">
      <span class="m-pill">About</span>
      <h1>About this app</h1>
      <p class="m-lead">
        Started in 2016 as a Yeoman AngularJS scaffold for trying out a Jenkins pipeline. Now it runs on Angular 21.
        The notes form below uses <strong>Signal Forms</strong>, which are experimental in v21.
      </p>
      <img class="m-logo" src="images/AfricanBank.png" alt="African Bank logo" />
    </section>
    <app-modern-notes />
  `,
})
export class ModernAbout {}
