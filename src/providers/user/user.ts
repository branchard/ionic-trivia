import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Account } from '../../models/account';

@Injectable()
export class User {
  private SETTINGS_KEY: string = '_account_settings';
  account: Account;

  constructor(public storage: Storage) {
  }

  login(account: Account) {
    this.account = account;
    return this.storage.set(this.SETTINGS_KEY, this.account);
  }

  load(): Promise<Account> {
    return new Promise((resolve, reject) => {
      this.storage.get(this.SETTINGS_KEY).then(account => {
        this.account = account;
        resolve(account);
      }).catch(err => {
        reject(err);
      });
    });
  }

  set(account: Account) {
    let mergedAccount = this.account;
    if(account.username && account.username.length > 0){
      mergedAccount.username = account.username;
    }

    if(account.pictureUrl && account.pictureUrl.length > 0){
      mergedAccount.pictureUrl = account.pictureUrl;
    }

    return this.storage.set(this.SETTINGS_KEY, mergedAccount);
  }
}
