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
import { jsforceService } from './jsforceService';
export let ChatterApp = class {
    constructor(forceService) {
        this.forceService = forceService;
        this.title = 'Chatter';
    }
    run() {
        this.forceService.connect()
            .subscribe(_ => console.log('connected'));
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
    __metadata('design:paramtypes', [jsforceService])
], ChatterApp);
bootstrap(ChatterApp, [jsforceService]);
//# sourceMappingURL=chatterApp.js.map