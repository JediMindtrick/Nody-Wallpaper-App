//var count = 0;
var net = require('net');
var mySockets = [];
var myImages = [];
var myImageDirectory = '/data/entertainment/pictures';
//var myImageDirectory = '/home/brandon';
var ranfiles = false;
var fs = require('fs');




setInterval(function(){
	//count++;
	//console.log(count);
	var toSend = "NONE";
	
	if(myImages.length == 0){
		myImages = getImages(myImageDirectory)
	}
	
	if(myImages.length > 0){
		toSend = myImages.pop();
	}
	
	console.log(toSend);
	
	for(var k = 0, l = mySockets.length; k < l; k++){
		//mySockets[k].write(count.toString());
		mySockets[k].write(toSend);
	}
	
},20000);


var server = net.createServer(function(socket){
	mySockets.push(socket);

	socket.on('end',function(socket){
		//mySocket = null;
		var i = mySockets.indexOf(socket);
		mySockets.splice(i,1);
	});	
});

var getImages = 
function(someDir)
{
	//console.log('inside getImages()');
	var toReturn = [];
	var fileList = listFiles(someDir);
	
	for(var i = 0; i < fileList.length; i++)
	{
		var name = fileList[i].toLowerCase();
		var split = name.split('.');
		var extension = split[split.length - 1];
		//console.log('extension is: ' + extension);
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
	
	//console.log('listing files for: ' + someDir);
	
	var files = fs.readdirSync(someDir);
	
	for(var i = 0, l = files.length; i < l; i++){
		//console.log('listFiles(): object found: ' + files[i]);
		//console.log('listFiles(): running stat on: ' + someDir + '/' + files[i]);
		
   		var myStat = fs.statSync(someDir + '/' + files[i]);
		//var myStat = fs.statSync(files[i]);
        if (myStat.isFile()) {
			//console.log('object is file: ' + files[i]);
			toReturn.push(files[i]);
		}
		else if (myStat.isDirectory())
		{
			//console.log('object is directory: ' + files[i]);
		}
		else{
			//console.log('object is neither: ' + files[i]);
		}
    }
	
	//console.log('listFiles returning ' + toReturn);
	
	return toReturn;
};

var listDirectories = function(someDir){
	var toReturn = [];
	
	//console.log('listing directories for: ' + someDir);
	
	var files = fs.readdirSync(someDir);
	
	for(var i = 0, l = files.length; i < l; i++){
		//console.log('listDirectories(): object found: ' + files[i]);
		//console.log('listDirectories(): running stat on: ' + someDir + '/' + files[i]);
		
   		var myStat = fs.statSync(someDir + '/' + files[i]);
		//var myStat = fs.statSync(files[i]);
        if (myStat.isDirectory()) {
			//console.log('directory found: ' + files[i]);
			//console.log(files[i]);
			toReturn.push(files[i]);
		}
    }
	
	return toReturn;
};

var main = function(){
	myImages = getImages(myImageDirectory);
	server.listen(9090);
}

main();
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
 */