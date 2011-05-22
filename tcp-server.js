var count = 0;
var net = require('net');
var mySockets = [];
var ranfiles = false;

setInterval(function(){
	count++;
	console.log(count);
	
	if(!ranfiles){
		ranfiles = true;
		getImages('/home/brandon');
	}
	
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
});

server.listen(9090);

var fs = require('fs');

var getImages = 
function(someDir)
{
	console.log('inside getImages()');
	var toReturn = [];
	var fileList = listFiles(someDir);
	
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
	
	var directoryList = listDirectories(someDir);
	
	for(var a = 0; a < directoryList.length; a++)
	{
		var toAdd = [];
		toAdd = getImages(someDir + '/' + directoryList[a]);
		for(var b = 0; b < toAdd.length; b++)
		{
			toReturn.push(toAdd[b]);
		}
	}
	
	
	return toReturn;
};

var listFiles = function(someDir){
	var toReturn = [];
	
	fs.readdir(someDir,function(err,files){
        for(var i = 0, l = files.length; i < l; i++){
       		var myStat = fs.statSync(files[i]);
            if (myStat.isFile()) {
				console.log(files[i]);
				toReturn.push(files[i]);
			}
        }
 	});
	
	return toReturn;
};

var listDirectories = function(someDir){
	var toReturn = [];
	
	fs.readdir(someDir,function(err,files){
        for(var i = 0, l = files.length; i < l; i++){
       		var myStat = fs.statSync(files[i]);
            if (myStat.isDirectory()) {
				console.log(files[i]);
				toReturn.push(files[i]);
			}
        }
 	});
	
	return toReturn;
};


/*
 * var myFs = require('fs');

myFs.readdir('/home/brandon',function(err,files){
        for(var i = 0, l = files.length; i < l; i++){
                console.log(files[i]);
                var myStat = myFs.statSync(files[i]);
                if(myStat.isDirectory())
                        console.log('Directory found');

                if(myStat.isFile())
                        console.log('File found');
                console.log(myStat);
        }
        //console.log(files);
 });

 * 
 */*/