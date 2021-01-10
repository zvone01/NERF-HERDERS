var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
var cors = require('cors');

// setup your username and passford for neo4j database
const dbusername = 'neo4j';
const dbpass = '12345678';

var app = express();
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(dbusername, dbpass));
var session = driver.session();
// enable cors
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  session
    .run('MATCH (n) OPTIONAL MATCH (parent)-->(n)   RETURN collect(n {.*, parent}) as nodes')
    .then((result) => {
      var nodeArr = [];
      // eslint-disable-next-line no-underscore-dangle
      result.records[0]._fields[0].forEach((record) => {
        nodeArr.push({
          name: record.name,
          description: record.description,
          parent: record.parent == null ? '' : record.parent.properties.name
        });
      });
      res.json(nodeArr);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
});

const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = app;
