import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  readonly testnetProperties = [
    "Prysm only",
    "Short-term",
    "Goerli Testnet ETH",
    "Publically accessible",
  ];

  readonly notTestnetProperties = [
    "Multi-client",
    "Long-term",
    "Real ETH",
    "Limited Participation",
  ];

  constructor() { }

  ngOnInit() {
  }

}
