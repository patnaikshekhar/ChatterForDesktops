/// <reference path="./typings/tsd.d.ts" />

import app = require('app');
import BrowserWindow = require('browser-window');

var mainWindow = null;

let CONSTANTS = {
	WIDTH: 800,
	HEIGHT: 800
};

let params = {
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
	
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});