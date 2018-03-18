'use strict';

const express = require('express');
const mongodb = require('mongodb');
const assert = require('assert');

const port = process.env.PORT || 8080;

const website = process.cwd() + '/public';

var app = express();

const dbUrl = process.env.MONGO_URI;
const dbName = dbUrl.substr(dbUrl.lastIndexOf('/') + 1);

const mongoClient = mongodb.MongoClient;

//app.use(express.static(website));

app.use(express.static(process.cwd() + '/views'));
app.use('/public', express.static(process.cwd() + '/public'));

app.get("/api/imagesearch/*", (request, response) => {
  console.log("/api/imagesearch/" + request.params[0]);

  var offset = Number(request.query.offset);

  if (isNaN(offset)) {
      offset = 0;
  }

  retrieveImageData (response, request.params[0], offset, retrieveImageDataCallback);
});

app.get("/api/latest/imagesearch/", (request, response) => {
  console.log("/api/latest/imagesearch/");

  var offset = Number(request.query.offset);

  if (isNaN(offset)) {
      offset = 0;
  }

  retrieveSearchLog (response, offset, retrieveSearchLogCallback);
});

app.set('json spaces', 2);

app.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...');
});

// ----

function retrieveImageDataCallback (response, docs) {
  response.json(docs);
}

function retrieveSearchLogCallback (response, docs) {
  for (var ii in docs) {
    docs[ii].stamp = new Date(docs[ii].stamp).toUTCString();
  }

  response.json(docs);
}

// ----

function retrieveImageData (response, query, offset, callback) {
  mongoClient.connect(dbUrl, (err, database) => {
    assert.equal(null, err);

    const criterion = {keywords: {$eq : query}};
    const projection = {_id: 0, keywords: 0, url: 0};

    database.db(dbName).collection('primates').
      find(criterion).project(projection).skip(offset).limit(10).toArray((err, docs) => {
        assert.equal(null, err);

        callback(response, docs);

        var doc = {
          find: query,
          found: docs.length,
          stamp: Date.now(),
        };

        database.db(dbName).collection('primateLogs').
          insertOne(doc, (err, documents) => {
            assert.equal(null, err);

            database.close();
          });
      });
  });
}

function retrieveSearchLog (response, offset, callback) {
  mongoClient.connect(dbUrl, (err, database) => {
    assert.equal(null, err);

    const all = {};
    const projection = {find: 1, found: 1, stamp: 1, _id: 0};
    const new2old = { stamp: -1};

    database.db(dbName).collection('primateLogs').
      find(all).project(projection).sort(new2old).skip(offset).limit(10).toArray((err, docs) => {
        assert.equal(null, err);

        callback(response, docs);

        database.close();
      });
  });
}
