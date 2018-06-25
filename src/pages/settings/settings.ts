import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Account } from '../../models/account';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  account: Account = {
    username: '',
    picture: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public user: User) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewWillEnter() {
    this.user.load().then((account) => {
      this.account = account;
    });
  }

  doChange() {
    this.user.set(this.account);
    this.dismiss();
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
