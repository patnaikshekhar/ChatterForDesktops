import {Component, bootstrap} from 'angular2/angular2'
import {Observable, Inject} from 'angular2/core';

import {IntervalService} from './intervalService'


@Component({
	selector: 'chatterApp',
	template: `
	<h1>{{ title }}</h1>
	<button (click)="run()">Run</button>
	`
})
export class ChatterApp {
	public title : string = 'Chatter';
	private intervalService : IntervalService;
	
	constructor(intervalService : IntervalService) {
		this.intervalService = intervalService;
	}
	
	run() {
		console.log('running');
		this.intervalService.run()
			.subscribe(
				() => console.log('called'), 
				err => console.error(err), 
				() => console.log('Done')
			);
	}
}

bootstrap(ChatterApp, [IntervalService]);