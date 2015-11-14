import {Component, bootstrap} from 'angular2/angular2'
import {Observable, Inject} from 'angular2/core';

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
	
	run() {
		this.forceService.connect()
			.subscribe(_ => console.log('connected'));
	}
}

bootstrap(ChatterApp, [jsforceService]);