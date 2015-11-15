/// <reference path="./typings/tsd.d.ts" />

// Removed all ES6 references because of errors

var app = require('app');
var BrowserWindow = require('browser-window');

// Add IPC for login flow
var ipc = require('ipc');
var request = require('request');
var url = require('url');

// Constants
var CLIENT_ID: string = '3MVG9WtWSKUDG.x6VWHkBVtkcEM.AMn8Dlp0LyYhq4MD6lcKq1smLVxRu09brLj0PwAJTHG3IWS0UNYda0q3d';
var CLIENT_SECRET: string = '7129679440721493406';

var REDIRECT_URI: string = 'https://boiling-ridge-4531.herokuapp.com';
var AUTH_BASE_URL: string = 'https://login.salesforce.com/services/oauth2';
var AUTH_URL: string = AUTH_BASE_URL + '/authorize?response_type=code&client_id=' + CLIENT_ID + '&redirect_uri=' + REDIRECT_URI;
var AUTH_TOKEN_URL: string = AUTH_BASE_URL + '/token';
// This is the final title string which will be watched for
var FINAL_TITLE: string = 'Movie Bookmarks';

var mainWindow = null;

var CONSTANTS = {
	WIDTH: 800,
	HEIGHT: 800
};

var params = {
	debug: true	
};

if (params.debug) {
	require('crash-reporter').start();
}

app.on('windows-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		width: CONSTANTS.WIDTH,
		height: CONSTANTS.HEIGHT
	})
	
	mainWindow.loadUrl(`file://${__dirname}/index.html`);
	
	if (params.debug) {
		mainWindow.openDevTools();	
	}
	
	// When login Flow is called, then call server
	ipc.on('login', function(event) {
		var authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
		authWindow.loadUrl(AUTH_URL);
		authWindow.show();
		
		authWindow.on('page-title-updated', function(e, title) {
			if (title == FINAL_TITLE) {
				// Get the URL of the window
				var url = authWindow.webContents.getUrl();
				var raw_code = /code=([^&]*)/.exec(url) || null,
    				code = (raw_code && raw_code.length > 1) ? decodeURIComponent(raw_code[1]) : null,
    				error = /\?error=(.+)$/.exec(url);
					
				if (code || error) {
					if (error) {
						// Send error to window
						mainWindow.webContents.send('logInError', error);
					} else {
						tokenFromCode(code, function(error: string, token: string, instanceUrl: string) {
							if (error) {
								mainWindow.webContents.send('logInError', error);
							} else {
								mainWindow.webContents.send('logInSuccess', {
									token: token,
									instanceUrl: instanceUrl
								});	
							}
						});
					}
				}	
			}
		});
	});

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
	
	function tokenFromCode(code:string, callback:(err: string, token: string, instanceUrl: string) => void) {
		request.post(AUTH_TOKEN_URL, {
			form: {
				code: code,
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				grant_type: 'authorization_code',
				redirect_uri: REDIRECT_URI
			}
		}, function(err, response, body) {
			if (err) {
				callback(err, null);	
			} else {
				console.log('Body', body);
				var message = JSON.parse(body);
				var accessToken = message.access_token;
				var instanceUrl = message.instance_url;
				
				callback(null, accessToken, instanceUrl);	
			}	
		});
	}
});