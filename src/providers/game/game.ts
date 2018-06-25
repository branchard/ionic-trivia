import { Injectable } from '@angular/core';
import { Category, Game, Difficulties, Question } from '../../models/game';
import { Api } from '../api/api';
import { User } from '..';

@Injectable()
export class GameProvider {
  public static DEFAULT_CATEGORY: Category = {
    id: 0,
    name: 'All'
  };
  private static CATEGORIES_URL = 'https://opentdb.com/api_category.php';
  private static QUESTIONS_URL = 'https://opentdb.com/api.php';
  private static LEADERBOARD_URL = 'https://leaderboard.lp1.eu/api/json';
  private static SCORE_URL = 'https://leaderboard.lp1.eu/api/score';
  private currentQuestionIndex = 0;
  public game: Game = {
    difficulty: null,
    category: null,
    score: null,
    timerStart: null,
    questions: null,
    timer: 0
  };

  private timerInterval;

  public gameEnded: boolean = false;

  public constructor(public api: Api, public user: User) {
  }

  public postScore() {
    this.api.post(GameProvider.SCORE_URL, {
      "nickname": this.user.account.username, 
      "score": this.game.score, 
      "time": this.game.timer, 
      "avatar_url":  this.user.account.pictureUrl
    });
  }

  public getLeaderboard(): Promise<Array<Category>> {
    console.log('getLeaderboard');
    return new Promise((resolve, reject) => {
      this.api.get(GameProvider.LEADERBOARD_URL).subscribe((res: any) => {
        resolve(res.sort((a, b) => {
          return b.score - a.score;
        }).slice(0, 5));
      }, err => {
        reject(err);
      });
    });
  }

  public getCategories(): Promise<Array<Category>> {
    console.log('getCategories');
    return new Promise((resolve, reject) => {
      this.api.get(GameProvider.CATEGORIES_URL).subscribe((res: any) => {
        resolve(res['trivia_categories']);
      }, err => {
        reject(err);
      });
    });
  }

  private loadQuestions(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.api.get(GameProvider.QUESTIONS_URL, {
        amount: 20,
        category: this.game.category.id,
        difficulty: Difficulties[this.game.difficulty],
        encode: 'base64'
      }).subscribe((res: any) => {
        console.log(res);
        this.game.questions = res.results.map((result) => {
          return {
            category: atob(result.category),
            text: atob(result.question),
            answers: [
              {
                correct: true,
                text: atob(result.correct_answer)
              },
              ...(result.incorrect_answers.map((i) => {
                return {
                  correct: false,
                  text: atob(i)
                }
              }))
            ]
          };
        });         
        resolve();
      }, err => {
        reject(err);
      });
    });
  }

  public setCategory(category: Category) {
    this.game.category = category;
  }

  public setDifficulty(difficulty: Difficulties){
    this.game.difficulty = difficulty;
  }

  public start(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.gameEnded = false;
      this.currentQuestionIndex = 0;
      this.game.score = 0;
      this.game.timer = 0;
      this.startTimer();
      this.loadQuestions().then(() => {
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  }

  private startTimer(){
    this.game.timerStart = performance.now();

    this.timerInterval = setInterval(() => {
      this.game.timer = Math.trunc((performance.now() - this.game.timerStart)/1000)
    }, 1000);
  }

  public stop(){
    this.stopTimer();
    this.gameEnded = true;
  }

  private stopTimer() {
    clearInterval(this.timerInterval);
  }
}
