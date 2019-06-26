const fs = require('fs');

module.exports = {
  read: (filename) => {
    return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		})
	});
  },
  write: (filename, content) => {
  	return new Promise((resolve, reject) => {
	    fs.writeFile(filename, content, (err) => {
			if(err) return reject(err);
			resolve("success");
		});
	});
  }
};