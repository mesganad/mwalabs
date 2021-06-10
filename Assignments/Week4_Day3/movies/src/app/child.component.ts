import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'child',
  template: `
    <h1>{{title}}</h1>
    <ul>
    <li> Anthony </li>
    <li> Charles </li>
    <li> Makron </li>
    </ul>
  `,
  styles: [
  'h1{color:red;}'
  ]
})
export class ChildComponent implements OnInit {

  title="Movie Directors";
  constructor() { }

  ngOnInit(): void {
  }

}
