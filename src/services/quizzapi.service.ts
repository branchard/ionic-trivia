// Core components
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { QuizzApiModel } from '../models/quizzapi.model';

@Injectable()
export class QuizzApiService {

    private baseUrl: string = 'https://opentdb.com/api.php';

    constructor(private http: Http) {

    }

    public getQuestions(): Promise<QuizzApiModel> {
        const url = `${this.baseUrl}?amount=20&encode=base64&type=multiple`;
    
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() /* as QuizzApiModel */)
            .catch(error => console.error('Une erreur est survenue' + error));
    }

}