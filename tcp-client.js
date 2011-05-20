var net = require('net');

var conn = net.createConnection(9090,'localhost');

conn.on('connect',function(){
	console.log('connected');
});

conn.setEncoding('ascii');

conn.on('data',function(data){
	//console.log('data received');
	//console.log(data.toString());
	console.log(data);
});
