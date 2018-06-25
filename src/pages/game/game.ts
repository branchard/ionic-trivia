import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QuizzApiModel } from '../../models/quizzapi.model';
import { QuizzApiService } from '../../services/quizzapi.service';

import { ScorePage } from '../score/score';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { Pipe, PipeTransform } from '@angular/core';

/*
export class AppComponent implements OnInit {

  countDown;
  counter = 1800;
  tick = 1000;
  
  ngOnInit() {
    this.countDown = Observable.timer(0, this.tick)
      .take(this.counter)
      .map(() => --this.counter)
  }

}
*/

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }

}

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  quizz: QuizzApiModel = new QuizzApiModel();
  randomQuestion: number;
  questionNumber: number = 0;
  currentQuestion: any;
  answerOutcome: string;
  score: number = 0;
  myScore: number;
  countDown;
  counter = 60*2 + 1;
  tick = 1000;
  
  
  ngOnInit() {
    this.countDown = Observable.timer(0, this.tick)
      .take(this.counter)
      .map(() => --this.counter)
  }

  constructor(public navCtrl: NavController, private quizzApiService: QuizzApiService) {
    this.randomQuestion = Math.floor(Math.random() * 10);
    this.quizzApiService.getQuestions()
      .then(questionsFetched => {
        this.quizz = questionsFetched;
        console.log(this.quizz);
      });
  }

  getRandomQuestion(){
    if(this.quizz.results == undefined){
      this.currentQuestion = null;
      return;
    }

    let result = this.quizz.results[Math.floor(Math.random() * this.quizz.results.length)];
    this.currentQuestion = {
      question: atob(result.question),
      correctAnswer: atob(result.correct_answer),
      answers: [
        atob(result.correct_answer),
        ...result.incorrect_answers.map(ianswer => {
          return atob(ianswer);
        })
      ]
    };
    console.log(this.currentQuestion);
    this.getQuestionNumber();
    this.endGameAndShowScore();
  }

  handleAnswer(answer) {
    console.log(answer);
    if(this.validateAnswer(answer)) {
      this.answerOutcome = 'Correct!';
      this.score += 5;
    }else {
      this.answerOutcome = 'Wrong, the good answer was: ' + this.currentQuestion.correctAnswer;
      this.score -= 5;
    }
    this.getRandomQuestion();
  }

  validateAnswer(answer) {
    return answer == this.currentQuestion.correctAnswer;
  }

  getQuestionNumber() {
    this.questionNumber += 1;
  }

  endGameAndShowScore() {
    if(this.questionNumber > 20) {
      // this.navCtrl.push(ScorePage);

      this.navCtrl.push(ScorePage, {
        myScore: this.score
      });

      // this.navCtrl.parent.select(2);
      
    }
  }



  /*
  ngOnInit() {
    this.getRandomQuestion();
  }
  */

}
