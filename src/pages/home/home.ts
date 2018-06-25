import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

// Pages
// import { GamePage } from '../game/game';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl: ModalController) {

  }

  goToGamePage() {
    // this.navCtrl.push(GamePage);
    this.navCtrl.parent.select(1);
  }

  presentSettingsModal() {
    let profileModal = this.modalCtrl.create(SettingsPage);
    profileModal.present();
  }

}
