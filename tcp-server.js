var count = 0;
var net = require('net');
var mySockets = [];

setInterval(function(){
	count++;
	console.log(count);
	
	/*
	if(mySocket != null){
		mySocket.write(count.toString() + '\n');
	}
	*/
	
	for(var k = 0, l = mySockets.length; k < l; k++){
		mySockets[k].write(count.toString());
	}
	
},2000);

var server = net.createServer(function(socket){
	mySockets.push(socket);

	socket.on('end',function(socket){
		//mySocket = null;
		var i = mySockets.indexOf(socket);
		mySockets.splice(i,1);
	});	

//	socket.write('hello\n');
//	socket.write('world\n');

//	socket.on('data',function(data){
//		socket.write(data);
//	});
});


server.listen(9090);
