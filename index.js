const execFile = require('child_process').execFile;
const fs = require('fs');

module.exports = function (path) {
  global.path = path;
  return new Promise(function (resolve, reject) {
    execFile('find', [path], function(err, stdout, stderr) {
      var paths = stdout.replace(new RegExp(path, "g"),"").split('\n');
      var dirs = [];
      for (var i = 0; i < paths.length; i++) {
        var cleanedArray = clean(paths[i].split("/"));
        dirs.push(cleanedArray);
      }
      dirs.pop();

      var tree = mapDirToTree(dirs);

      resolve(tree);
    });
  });
}

function clean(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == "") {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};

function mapDirToTree(array) {
  var result = {};
  for (var a = 0; a < array.length; a++) {
    var item = array[a];
    var temp = result;
    for (var i = 0; i < item.length; i++) {
      if (!temp[item[i]]) {
        temp = temp[item[i]] = {};
      } else {
        temp = temp[item[i]];
      }
    }
    var stats = fs.statSync(path+item.join("/"));
    if (stats.isFile()) {
      var file = fs.readFileSync(path+item.join("/")).toString();
      var temp = result;
      for (var i = 0; i < item.length; i++) {
        if (i == item.length-1) {
          temp = temp[item[i]] = file;
        } else {
          temp = temp[item[i]];
        }
      }
    }
  }
  return result;
}
