import { Injectable } from '@angular/core';
import { Category, Game, Difficulties } from '../../models/game';
import { Api } from '../api/api';

@Injectable()
export class GameProvider {
  public static DEFAULT_CATEGORY: Category = {
    id: 0,
    name: 'All'
  };
  private static CATEGORIES_URL = 'https://opentdb.com/api_category.php';
  public game: Game = {
    difficulty: null,
    category: null,
    score: null,
    timerStart: null
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

  public setCategory(category: Category) {
    this.game.category = category;
  }

  public setDifficulty(difficulty: Difficulties){
    this.game.difficulty = difficulty;
  }

  public startTimer(){
    this.game.timerStart = performance.now();
  }
}
