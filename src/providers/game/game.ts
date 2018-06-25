import { Injectable } from '@angular/core';
import { Category, Game, Difficulties, Question } from '../../models/game';
import { Api } from '../api/api';

@Injectable()
export class GameProvider {
  public static DEFAULT_CATEGORY: Category = {
    id: 0,
    name: 'All'
  };
  private static CATEGORIES_URL = 'https://opentdb.com/api_category.php';
  private static QUESTIONS_URL = 'https://opentdb.com/api.php';
  private currentQuestionIndex = 0;
  public game: Game = {
    difficulty: null,
    category: null,
    score: null,
    timerStart: null,
    questions: null
  };

  public constructor(public api: Api) {
    console.log('Hello GameProvider Provider');
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

  public loadQuestions(): Promise<void>{
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

  public startTimer(){
    this.game.timerStart = performance.now();
  }

  public getCurrentQuestionAndNext(){
    return this.game.questions[this.currentQuestionIndex++];
  }

  public hasNextQuestion(): boolean {
    return this.game.questions.length >= this.currentQuestionIndex;
  }
}
