const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const formidableMiddleware = require('express-formidable');

const app = express();
const server = http.Server(app);
const publicPath = path.join(__dirname, `./../public`);
const port = process.env.PORT || 5000;

if (!fs.existsSync('./public/uploads')) {
  fs.mkdirSync(`./public/uploads`);
}

const DataController = require('./data/data-controller.js');

const dataController = new DataController('./server/data/webinars-db.json');

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port %d`, port); // eslint-disable-line no-console
});

app.use(cors());
app.use(express.static(publicPath));

const fileUploadDir = './../public/uploads';

const formidableSettings = {
  options: {
    encoding: 'utf-8',
    uploadDir: fileUploadDir,
    multiples: true // req.files to be arrays of files
  },
  events: [{
    event: 'fileBegin',
    action: function (req, res, next, name, file) {
      const [fileName, fileExt] = file.name.split('.');

      file.path = path.join(__dirname, `${fileUploadDir}/${fileName.split(' ').join('-')}.${fileExt}`);
    }
  }]
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post('/webinars', (req, res) => {
  dataController.updateWebinars(req.body, (lastAdded) => {
    res.send(JSON.stringify(lastAdded, null, 2));
    res.end();
  });
});

app.get('/webinars', cors(), (req, res) => {
  res.send(JSON.stringify(dataController.getWebinars(), null ,2));
  res.end();
});

app.use(formidableMiddleware(formidableSettings.options, formidableSettings.events));

app.post('/uploads', cors(), (req, res) => {
  res.end();
});
