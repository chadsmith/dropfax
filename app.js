var
  Phaxio = require('phaxio'),
  express = require('express'),
  fs = require('fs'),
  app = express(),
  phaxio = new Phaxio('e222........................', '62e5........................');

app.configure(function () {
  app.use(express.static(__dirname + '/'));
  app.use(express.bodyParser({ uploadDir: __dirname + '/' }));
});

app.post('/', function(req, res) {
  var
    file = req.files.file,
    filename = file.path + file.name;
  fs.rename(file.path, filename, function() {
    phaxio.sendFax({ to: req.body.to, filenames: filename }, function(err, result) {
      fs.unlink(filename);
      res.send(err || result.message);
    });
  });
});

app.listen(8000);
