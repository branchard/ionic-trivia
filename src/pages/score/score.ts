import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GamePage } from '../game/game';

import { NavParams } from 'ionic-angular';

// Native component
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})
export class ScorePage {

    score: number;

    constructor(public navCtrl: NavController, private nativeStorage: NativeStorage, private navParams: NavParams) {
      
    }

    public storeScore() {
        this.nativeStorage.setItem('my-score', {
            score: this.score
        })
        .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
        );
    }

    public getMyScore() {
      this.nativeStorage.getItem('my-score')
      .then(
        data => this.score = data.score,
        error => console.error(error)
      );

      this.score = this.navParams.get('score'); 

    }



}




