/**@fileoverview
 * @author brandon wilhite
 * PURPOSE:
 *
 * TODO:
 *
 * CHANGE LOG:
 */
//var rootDirectory = '/data/entertainment/pictures';
//system.stdout("Beginning wallpaper.");
system.sleep(60);
var Process = require('process').Process;

var changeWallpaper = 
function(filename)
{
	try 
	{		
		var basicCommand = 'gconftool -s /desktop/gnome/background/picture_filename -t string ';//followed by full filename
		var p = new Process();
		
		//system.stdout('Changing picture to: ' + filename);
		p.exec(basicCommand + filename); //+ '-s /desktop/gnome/background/picture_options scale');
	} 
	catch (e) 
	{
		system.stdout(e.toString());
	}
};

var fisherYates = 
function(myArray) 
{
	var i = myArray.length;
	if(i == 0) return false;
  	while(--i) 
	{
     		var j = Math.floor( Math.random() * ( i + 1 ) );
     		var tempi = myArray[i];
     		var tempj = myArray[j];
     		myArray[i] = tempj;
     		myArray[j] = tempi;
   	}
}

var getImages = 
function(someDir)
{
//	system.stdout('getImages(): ' + someDir + '\n');
	var toReturn = [];
	
	var d = new Directory(someDir);
	
	var directoryList = d.listDirectories();
//	system.stdout('preparing to list directories inside: ' + d.toString() + '\n');
	for(var a = 0; a < directoryList.length; a++)
	{
		var toAdd = [];
//		system.stdout(directoryList[a] + '\n');
//		system.stdout('recursing getImages().' + '\n');
		toAdd = getImages(someDir + '/' + directoryList[a]);
		for(var b = 0; b < toAdd.length; b++)
		{
			toReturn.push(toAdd[b]);
		}
	}
	
	var fileList = d.listFiles();
//	system.stdout('preparing to list files inside: ' + d.toString() + '\n');
	for(var i = 0; i < fileList.length; i++)
	{
		//system.stdout('checking file: ' + fileList[i] + '\n');
		var name = fileList[i].toLowerCase();
		var split = name.split('.');
		var extension = split[split.length - 1];
		//system.stdout('extension is: ' + extension + '\n');
		if(extension == 'png' || extension == 'jpg' || extension == 'gif')
		{
			toReturn.push('"' + someDir + '/' + fileList[i] + '"');
			//changeWallpaper('"' + someDir + '/' + fileList[i] + '"');
			//next 2 lines for debugging only
			//system.stdout('Adding file: "' + someDir + '/' + fileList[i] + '"' + '\n');
//			system.stdout(fileList[i] + '\n');
//			system.sleep(1);
		}
		//system.stdout('i is: ' + i.toString() + ', length is: ' + fileList.length.toString() + '\n');
	}
//	system.stdout('preparing to return images from: ' + someDir + '\n');
	fisherYates(toReturn);
	return toReturn;
};

var cycleWallpaper =
function(someImages)
{
	var toCycle = someImages;
//	system.stdout(toCycle.length + ' images found.');
	for(var k = 0; k < toCycle.length; k++)
	{
		changeWallpaper(toCycle[k]);
		if(k === toCycle.length - 1)
		{
			k = 0;
			toCycle = getImages('/data/entertainment/pictures');
		}
		system.sleep(30);	
	}
};

var run = 
function()
{
//	system.stdout('retrieving images' + '\n');
	var images = getImages('/data/entertainment/pictures');
//	system.stdout('cycling wallpaper');
	cycleWallpaper(images);
};

try
{
	run();
}
catch(e)
{
	system.stdout(e.toString() + '\n');
}
