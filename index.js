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
File.writeTextFile( "./index.log", console.endLog().toString() );


  var access = fs.createWriteStream(dir + './index.log', 
  { flags: 'a' })
      , error = fs.createWriteStream(dir + './index.log', 
	  { flags: 'a' });
	  
 	  
   var window.onload = readLogFile; 
	   pathname = window.location.pathname;
	   
	   
	
