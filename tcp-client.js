/*This is an extraneous comment to cause a change.  Learning Aptana+git integration...*/

var net = require('net');
var sys = require('sys')
var exec = require('child_process').exec;
var puts = function (error, stdout, stderr) { sys.puts(stdout) }

var conn = net.createConnection(9090,'TARDIS');

conn.on('connect',function(){
	console.log('connected');
});

conn.setEncoding('ascii');

var changeWallpaper = 
function(filename)
{
	try 
	{		
		var basicCommand = 'gconftool -s /desktop/gnome/background/picture_filename -t string ';//followed by full filename
		//var p = new Process();
		
		//system.stdout('Changing picture to: ' + filename);
		exec(basicCommand + filename, puts); //+ '-s /desktop/gnome/background/picture_options scale');
	} 
	catch (e) 
	{
		console.log(e.toString());
	}
};

conn.on('data',function(data){
	//console.log('data received');
	//console.log(data.toString());
	console.log(data);
	changeWallpaper(data);
});