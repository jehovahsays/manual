  "use strict";
  
const { createServer } = require('node:http');

const hostname = 'localhost';
const port = 80;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


console.beginLog();
File.writeTextFile( "./robots.txt", console.endLog().toString() );


  var access = fs.createWriteStream(dir + './robots.txt', 
  { flags: 'a' })
      , error = fs.createWriteStream(dir + './robots.txt', 
	  { flags: 'a' });
	  
 	  
   var window.onload = readLogFile; 
	   pathname = window.location.pathname;
	   
	   
	
