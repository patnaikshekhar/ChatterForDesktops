import {Component, bootstrap} from 'angular2/angular2'
import {Observable, Inject} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {jsforceService} from './jsforceService'


@Component({
	selector: 'chatterApp',
	template: `
	<h1>{{ title }}</h1>
	<button (click)="run()">Run</button>
	`
})
export class ChatterApp {
	public title : string = 'Chatter';
	
	constructor(private forceService : jsforceService) {
	}
	
	handleError(error: string) {
		console.error(error);
	}
	
	run() {
		this.forceService.connect()
			.subscribe(
				_ => {
					this.forceService.getFeeds()
						.subscribe(
							response => console.log(response), 
							handleError)
				}, 
				handleError
			);
	}
}

bootstrap(ChatterApp, [HTTP_PROVIDERS, jsforceService]);