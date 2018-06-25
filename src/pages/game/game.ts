import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { Question, Game, Answer } from '../../models/game';
import { ScoreboardPage } from '../';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public game: Game;
  public currentQuestionIndex: number = 0;
  public answerOutcome: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public gameProvider: GameProvider) {
  }

  ionViewDidLoad() {
    this.game = this.gameProvider.game
    this.game.score = 0;
  }

  handleAnswer(answer: Answer) {
    if(this.gameProvider.gameEnded){
      return;
    }

    if(answer.correct) {
      this.answerOutcome = 'Correct!';
      this.game.score += this.game.difficulty;
    }else {
      this.answerOutcome = 'Wrong, the good answer was: ' + this.game.questions[this.currentQuestionIndex].answers.filter(answer => {
        return answer.correct;
      })[0].text;
      this.game.score -= this.game.difficulty;
    }

    if(this.currentQuestionIndex + 1 < this.game.questions.length){
      this.currentQuestionIndex++;
    }else{
      console.log('end');
      this.gameProvider.stop();
      this.gameProvider.postScore();
      this.navCtrl.push(ScoreboardPage);
    }
  }
}
