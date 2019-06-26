const fs 			= require('./filesystem');
const is 			= require('./includesystem');
const htmlMinify 	= require('html-minifier').minify;

const build = () => {
	
	let bfr = [];

	let files = [
		"./src/template/head.html",
		"./src/template/body.html",
		"./src/template/body-end.html"
	];

	let promises = files.map((file) => {
		return fs.read(file)
			.then((result) => {
				bfr.push(result);
			})
			.catch((err) => console.log(err));
	});

	Promise.all(promises).then(() => {
		let html;

		if (bfr.length > 1) 
			html = Buffer.concat(bfr).toString("utf8");
		else 
			html = bfr[0].toString("utf8");

		html = htmlMinify(html, {
			removeAttributeQuotes: true,
			collapseWhitespace: true,
		});

		// html = is.include(html);

		fs.write("./index.html", html)
			.catch((err) => console.log(err));
	});
};

build();