import { Component } from '@angular/core';

import { GamePage } from '../game/game';
import { ScorePage } from '../score/score';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GamePage;
  tab3Root = ScorePage;

  constructor() {

  }
  
}
