import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QuizzApiModel } from '../../models/quizzapi.model';
import { QuizzApiService } from '../../services/quizzapi.service';

import { ScorePage } from '../score/score';

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
    this.endGame();
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

  endGame() {
    if(this.questionNumber > 3) {
      // this.navCtrl.push(ScorePage);
      //this.navCtrl.parent.select(2);

      this.navCtrl.push(ScorePage, {
        score: this.score
      });
      
    }
  }



  /*
  ngOnInit() {
    this.getRandomQuestion();
  }
  */

}
