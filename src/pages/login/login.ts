import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { HomePage } from '../';
import { Account } from '../../models/account';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  account: Account = {
    username: '',
    picture: ''
  };

  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController) {
      this.user.load().then(account => {
        if(account && account.username && account.picture){
          this.navCtrl.push(HomePage);
        }
      });
  }

  doLogin() {
    if(this.account.username && this.account.picture){
      this.loginErrorString = null;
      this.user.login(this.account).then(() => {
        this.navCtrl.push(HomePage);
      }).catch(err => {
        this.loginErrorString = 'Unable to login'
      });
    }else{
      this.loginErrorString = 'You must set your username and picture'
    }
  }

  pictureChangeListener(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.account.picture = reader.result;
    };
  }
}
