import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'actor',
  template: `
    
      <h1>{{title}}</h1>
      <ul>
      <li>John Snow</li>
      <li>Schofil</li>
      <li>Shelden</li>
      </ul>
    <hr/>
  `,
  styles: [
    'h1{color:#fcbe11;}'
  ]
})
export class ActorComponent implements OnInit {
 title='Movie Actors';
  constructor() { }

  ngOnInit(): void {
  }

}
