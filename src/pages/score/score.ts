import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import { GamePage } from '../game/game';

import { NavParams } from 'ionic-angular';

// Native component
import { NativeStorage } from '@ionic-native/native-storage';
import { GamePage } from '../game/game';

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

        this.nativeStorage.getItem('my-score')
        .then(
          data => this.score = data.score,
          error => console.error(error)
        );
  
        this.score = this.navParams.get('myScore');
        
    }

    playAgain() {
     
      // this.score = 0;
      this.navCtrl.push(GamePage, {
        myScore: 0,
        questionNumber: 0
      });
      this.score = this.navParams.get('myScore');
      
    }

    /*
    public getMyScore() {
      this.nativeStorage.getItem('my-score')
      .then(
        data => this.score = data.score,
        error => console.error(error)
      );

      this.score = this.navParams.get('score'); 

    }
    */


}




