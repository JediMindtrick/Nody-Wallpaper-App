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

var getImages = 
function(someDir)
{
	var toReturn = [];
	
	var d = new Directory(someDir);
	
	var directoryList = d.listDirectories();
	
	for(var a = 0; a < directoryList.length; a++)
	{
		var toAdd = [];
		toAdd = getImages(someDir + '/' + directoryList[a]);
		for(var b = 0; b < toAdd.length; b++)
		{
			toReturn.push(toAdd[b]);
		}
	}
	
	var fileList = d.listFiles();
	
	for(var i = 0; i < fileList.length; i++)
	{
		var name = fileList[i].toLowerCase();
		var split = name.split('.');
		var extension = split[split.length - 1];
		if(extension == 'png' || extension == 'jpg' || extension == 'gif')
		{
			toReturn.push('"' + someDir + '/' + fileList[i] + '"');
		}
	}
	return toReturn;
};
