var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var newpath;


exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();

    form.parse(request, function(error, fields, files) {
        newpath = path.resolve(__dirname, '../files_uploaded/' + files.upload.name);
        
        fs.renameSync(files.upload.path, newpath);
        fs.readFile(path.resolve(__dirname, '../templates/upload.html'), function(err, html) {
        	response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.write(html);
        	response.write("Zapisano plik: " + files.upload.name + "<br/>");
        	response.write("<img src='/show' />");
        	response.end();
        });
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
    	response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    	response.write(html);
    	response.end();	
    });
}

exports.show = function(request, response) {
	fs.readFile(newpath, "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(file, "binary");
		response.end();
	});
}

exports.style = function(request, response) {
    fs.readFile(path.resolve(__dirname, '../templates/style.css'), function(err, css) {
    	response.writeHead(200, {"Content-Type": "text/css"});
    	response.write(css);
    	response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}