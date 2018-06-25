import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

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
  fooId: any;

  constructor(private params: NavParams) {
    
    this.params = params;
    console.log(this.params); // returns NavParams {data: Object}

    this.fooId = this.params.data;
    console.log(this.fooId);

  }
  
}
