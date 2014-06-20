
var sha1 = require("sha1");
var fs = require("fs");

var DATA=".";

function setDataDirectory(dname) {
	DATA = dname;
}

function mkName(params) {
	var bucket_hash = sha1(params.Bucket);
	var key_hash = sha1(params.Key);
	return DATA + "/" + bucket_hash + "/" + key_hash;
}

function putFileObject(params, callback) {

	createBucketDirIfNeeded(params, function(err, data) {

		var fname = mkName(params);
		console.log("putFileObject: fname: " + fname);

		fs.writeFile(fname, JSON.stringify(params), function(err1,data1) {
			callback(err1,data1);
		});
	});
}

function getFileObject(params, callback) {
	var fname = mkName(params);
	console.log("getFileOject called " + JSON.stringify(params));
	console.log("getFileObject: fname: " + fname);
	fs.readFile(fname, function(err,data) {
		callback(err,data);
	});
}

function createBucketDirIfNeeded(params, callback) {
	var hash = sha1(params.Bucket);
	console.log("checking for this dir " + hash);
	var path = 
	fs.mkdir(DATA + "/" + hash, function(err,data){
		// TC: when dir is present this returns
		// an error, we will ignore this willfully
		callback(null,null);
	});
}

exports.putFileObject = putFileObject;
exports.getFileObject = getFileObject;
exports.setDataDirectory = setDataDirectory;

