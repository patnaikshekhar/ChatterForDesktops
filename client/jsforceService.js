var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import * as Rx from '../node_modules/@reactivex/rxjs/dist/cjs/Rx';
import { Http, Headers } from 'angular2/http';
import { Inject } from 'angular2/core';
export class jsforceService {
    constructor(http) {
        this.FEED_ELEMENTS_URL = '/services/data/v35.0/chatter/feeds/news/me/feed-elements';
        this.http = http;
    }
    connect() {
        return Rx.Observable.create((subscriber) => {
            var ipc = require('ipc');
            // Send login to the main process and wait for message
            ipc.send('login');
            ipc.on('logInSuccess', (obj) => {
                console.log('Completed Log In');
                this.token = obj.token;
                this.instanceUrl = obj.instanceUrl;
                subscriber.next();
                subscriber.complete();
            });
            ipc.on('logInError', (error) => {
                console.error('Log in failed', error);
                subscriber.error(error);
            });
        });
    }
    getHeaders() {
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        return headers;
    }
    getFeeds() {
        console.log('Here');
        console.log(this.http);
        console.log(this.instanceUrl + this.FEED_ELEMENTS_URL);
        console.log(this.getHeaders());
        return this.http.get(this.instanceUrl + this.FEED_ELEMENTS_URL, {
            headers: this.getHeaders()
        });
    }
}
jsforceService = __decorate([
    __param(0, Inject(Http)), 
    __metadata('design:paramtypes', [(typeof Http !== 'undefined' && Http) || Object])
], jsforceService);
//# sourceMappingURL=jsforceService.js.map