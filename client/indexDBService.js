import * as Rx from '../node_modules/@reactivex/rxjs/dist/cjs/Rx';
export class db {
    constructor() {
        this.ipc = require('ipc');
        this.reference = 0;
    }
    put(key, value) { }
}
void ;
{
    return Rx.Observable.create((subscriber) => {
        let reference = getReference();
        ipc.send('db-put', {
            key: key,
            value: value,
            reference: reference
        });
        ipc.on('db-put-complete', obj => {
            if (obj.reference === reference) {
                subscriber.next();
            }
        });
        ipc.on('db-put-error', obj => {
            if (obj.reference === reference) {
                subscriber.error(obj.error);
            }
        });
    });
}
get(key, string);
Observable < string > {
    return: Rx.Observable.create((subscriber) => {
        let reference = getReference();
        ipc.send('db-get', {
            key: key,
            reference: reference
        });
        ipc.on('db-get-complete', obj => {
            if (obj.reference === reference) {
                subscriber.next(obj.value);
            }
        });
        ipc.on('db-get-error', obj => {
            if (obj.reference === reference) {
                subscriber.error(obj.error);
            }
        });
    })
};
getReference();
number;
{
    this.reference += 1;
    return this.reference;
}
//# sourceMappingURL=indexDBService.js.map