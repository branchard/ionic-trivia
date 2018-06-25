import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScoreboardPage } from './scoreboard';

@NgModule({
  declarations: [
    ScoreboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ScoreboardPage),
  ],
})
export class ScoreboardPageModule {}
