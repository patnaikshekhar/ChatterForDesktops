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
import { Component, bootstrap } from 'angular2/angular2';
import { IntervalService } from './intervalService';
export let ChatterApp = class {
    constructor(intervalService) {
        this.title = 'Chatter';
        this.intervalService = intervalService;
    }
    run() {
        console.log('running');
        this.intervalService.run()
            .subscribe(() => console.log('called'), err => console.error(err), () => console.log('Done'));
    }
};
ChatterApp = __decorate([
    Component({
        selector: 'chatterApp',
        template: `
	<h1>{{ title }}</h1>
	<button (click)="run()">Run</button>
	`
    }), 
    __metadata('design:paramtypes', [IntervalService])
], ChatterApp);
bootstrap(ChatterApp, [IntervalService]);
//# sourceMappingURL=chatterApp.js.map