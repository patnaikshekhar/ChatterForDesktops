//import * as jsforce from '../node_modules/jsforce/lib/jsforce';
import * as Rx from '../node_modules/@reactivex/rxjs/dist/cjs/Rx';

export class jsforceService {
	
	private token: string;
	private FEED_ELEMENTS_URL = '/chatter/feeds/news/me/feed-elements';
	
	private service;
	private connection;
	
	constructor() {
		//this.service = jsforce;	
	}
	
	connect() : Rx.Observable<any> {
		
		return Rx.Observable.create((subscriber : Rx.Subscriber<void>) => {
			
			var ipc = require('ipc');
			
			// Send login to the main process and wait for message
			ipc.send('login');
			
			ipc.on('logInSuccess', (token) => {
				console.log('Completed Log In');
				this.token = token;
				subscriber.next();
				subscriber.complete();
			});
			
			ipc.on('logInError', (error) => {
				console.error('Log in failed', error);
				subscriber.error(error);
			});
		});
	}
}