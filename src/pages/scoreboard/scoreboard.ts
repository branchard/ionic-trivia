import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { Game } from '../../models/game';
import { HomePage } from '../home/home';

/**
 * Generated class for the ScoreboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scoreboard',
  templateUrl: 'scoreboard.html',
})
export class ScoreboardPage {
  public leaderboard: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public gameProvider: GameProvider) {
  }

  ionViewDidLoad() {
    this.gameProvider.getLeaderboard().then(leaderboard => {
      console.log(leaderboard);
      this.leaderboard = leaderboard;
    });
  }

  restart() {
    console.log('restart');
    this.navCtrl.push(HomePage);
  }
}
