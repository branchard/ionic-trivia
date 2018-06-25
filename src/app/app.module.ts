import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormatTimePipe } from '../pages/game/game';

import { GamePage } from '../pages/game/game';
import { ScorePage } from '../pages/score/score';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { QuizzApiService } from '../services/quizzapi.service';
import { HttpModule } from '@angular/http';

import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule, Storage } from '@ionic/storage';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
/*
export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
*/

export function provideSettings(storage: Storage) {
	/**
	 * The Settings provider takes a set of default settings for your app.
	 *
	 * You can add new settings options at any time. Once the settings are saved,
	 * these values will not overwrite the saved values (this can be done manually if desired).
	 */
	return new Settings(storage, {
		option1: true,
		option2: 'Ionitron J. Framework',
		option3: '3',
		option4: 'Hello'
	});
}

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    ScorePage,
    HomePage,
    FormatTimePipe,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    /* TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				// useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}), */
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    ScorePage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Api,
    User,
    Items,
    NativeStorage,
    QuizzApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
  ]
})
export class AppModule {}
