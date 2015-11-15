//import * as jsforce from '../node_modules/jsforce/lib/jsforce';
import * as Rx from '../node_modules/@reactivex/rxjs/dist/cjs/Rx';
import {Http, Headers} from 'angular2/http'
import {Inject} from 'angular2/core'

export class jsforceService {
	
	private token: string;
	private instanceUrl: string;
	
	private FEED_ELEMENTS_URL = '/services/data/v35.0/chatter/feeds/news/me/feed-elements';
	
	private http: Http;
	
	constructor(@Inject(Http) http:Http) {
		this.http = http;
	}
	
	connect() : Rx.Observable<any> {
		
		return Rx.Observable.create((subscriber : Rx.Subscriber<void>) => {
			
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
	
	private getHeaders() : Headers {
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