const $ = require('jquery');
const fs = require('fs');

const defaultTask = (callback) => {

	var jsdom = require("jsdom");
	const { JSDOM } = jsdom;
	const { window } = new JSDOM();
	const { document } = (new JSDOM('')).window;
	global.document = document;

	document.body.innerHTML = "<h1> Hello </h1>";

	fs.writeFile("./index.teste.html", "<!DOCTYPE html>" + document.documentElement.outerHTML, (err) => {
		if(err) return console.log(err);
	    console.log("The file was saved!");
	});

	console.log(document.documentElement.innerHTML);

// var $ = jQuery = require('jquery')(window);

  	callback();
};

exports.default = defaultTask