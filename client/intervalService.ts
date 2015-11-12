import * as Rx from '../node_modules/@reactivex/rxjs/dist/cjs/Rx';

export class IntervalService {
	
	constructor() {
		console.log('Consutructed IntervalService');
	}
	
	run() : Rx.Observable<void> {
		
		return Rx.Observable.create(function(subscriber : Rx.Subscriber<void>) {
			console.log(subscriber);
			setInterval(() => subscriber.next({}), 2000);
			
			return function() {
				console.log('disposed');
			};
		});
	}
}