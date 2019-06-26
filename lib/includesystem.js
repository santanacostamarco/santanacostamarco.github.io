const fs = require("./filesystem");
module.exports = {
	include: (str) => {

		/* Replace the files name by the file content expressed by: */ /*{{./caminho/do/arquivo}}*/

		let reg = new RegExp("(?<=\\/\\*{{)(.+?(?=}}\\*\\/))", 'g');

		let matches = str.match(reg);

		let promises = matches.map((match) => {
			let file = match.trim();
			reg = new RegExp(`\\/\\*{{${file.replace(/\./g, "\\.")}}}\\*\\/`);

			let content;

			return fs.read(file)
				.then((result) => {
					content = result.toString("utf8");
					str = str.replace(reg, content);
				})
				.catch((err) => console.log(err));
		});

		return str;
	}
}