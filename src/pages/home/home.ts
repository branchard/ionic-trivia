import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Pages
// import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToGamePage() {
    // this.navCtrl.push(GamePage);
    this.navCtrl.parent.select(1);
  }

}
