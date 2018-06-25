import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { LoginPage } from '../pages';

@Component({
	template: `<ion-menu [content]="content">
		<ion-header>
			<ion-toolbar>
				<ion-title>Pages</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<ion-list>
				<button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
					{{p.title}}
				</button>
			</ion-list>
		</ion-content>

	</ion-menu>
	<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
	rootPage = LoginPage;

	@ViewChild(Nav) nav: Nav;

	constructor(private translate: TranslateService, platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
		platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
