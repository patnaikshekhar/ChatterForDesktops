import * as Rx from '../node_modules/@reactivex/rxjs/dist/cjs/Rx';
export class IntervalService {
    constructor() {
        console.log('Consutructed IntervalService');
    }
    run() {
        return Rx.Observable.create(function (subscriber) {
            console.log(subscriber);
            setInterval(() => subscriber.next(), 2000);
            return function () {
                console.log('disposed');
            };
        });
    }
}
//# sourceMappingURL=intervalService.js.map