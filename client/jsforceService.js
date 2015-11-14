import * as Rx from '../node_modules/@reactivex/rxjs/dist/cjs/Rx';
export class jsforceService {
    constructor() {
        this.FEED_ELEMENTS_URL = '/chatter/feeds/news/me/feed-elements';
        //this.service = jsforce;	
    }
    connect() {
        return Rx.Observable.create((subscriber) => {
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
//# sourceMappingURL=jsforceService.js.map