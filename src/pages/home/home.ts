import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SettingsPage } from '../';
import { GameProvider } from '../../providers/game/game';
import { Category, Difficulties } from '../../models/game';
import { GamePage } from '../';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public categories: Array<Category> = [GameProvider.DEFAULT_CATEGORY];
  public difficulties = Difficulties;
  public category: Category = this.categories[0];
  public keys = Object.keys;
  public difficulty: Difficulties = Difficulties.easy;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl: ModalController, public gameProvider: GameProvider) {
  }

  presentSettingsModal() {
    let profileModal = this.modalCtrl.create(SettingsPage);
    profileModal.present();
  }

  getDifficultiesKeys() {
    return Object.keys(this.difficulties).filter(key => !isNaN(Number(this.difficulties[key])));
  }

  ionViewWillEnter() {
    this.gameProvider.getCategories().then(categories => {
      this.categories = this.categories.concat(categories);
    });
  }

  startGame(){
    console.log('Start!');
    this.gameProvider.setCategory(this.category);
    this.gameProvider.setDifficulty(this.difficulty);
    this.gameProvider.start().then(() => {
      this.navCtrl.push(GamePage);
    });
  }
}
