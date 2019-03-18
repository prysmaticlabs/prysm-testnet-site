import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly testnetProperties = [
    'Prysm only',
    'Publically accessible',
  ];

  readonly notTestnetProperties = [
    'Multi-client',
    'Real ETH',
  ];

  constructor() { }

  ngOnInit() {
  }

}
