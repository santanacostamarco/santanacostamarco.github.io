class Engine {
	constructor () {

	}

	getFile (filePath){
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", filePath, false);
	    xhr.onreadystatechange = function ()
	    {
	        if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status == 0)){
                return xhr.responseText;
	        }
	    }
	    xhr.send(null);
	}
}