const fs 			= require('fs');
const htmlMinify 	= require('html-minifier').minify;

const readFile = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		})
	});
};

const runIncludes = (str) => {
	let reg = new RegExp("(?<=\\/\\*{{)(.+?(?=}}\\*\\/))", 'g');

	let matches = str.match(reg);

	matches.map((match) => {
		match = match.trim();
		reg = new RegExp(`\\/\\*{{${match.replace(/\./g, "\\.")}}}\\*\\/`);

		console.log(reg);

		str = str.replace(reg, "todo file " + match);
	});

	return str;
};

const build = (cb) => {
	
	let bfr = [];

	let files = [
		"./src/template/head.html",
		"./src/template/body.html",
		"./src/template/body-end.html"
	];

	let promises = files.map((file) => {
		return readFile(file)
			.then((result) => {
				bfr.push(result);
			})
			.catch((error) => console.log(error));
	});

	Promise.all(promises).then(() => {
		let html;

		if (bfr.length > 1) {
			html = Buffer.concat(bfr).toString("utf8");
		}
		else {
			html = bfr[0].toString("utf8");
		}

		html = htmlMinify(html, {
			removeAttributeQuotes: true,
			collapseWhitespace: true,
		});

		html = runIncludes(html);


		// html = html.replace(/(?<=\/\*.+@include)(.*)(?=\*\/)/g, "teste replace");


		fs.writeFile("./index.html", html, (err) => {
			if(err) return console.log(err);
		});
	});

  	if (cb) cb();
};

build();