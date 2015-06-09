# orthanc-client [![Build Status](https://travis-ci.org/FWoelffel/orthanc-client.svg?branch=master)](https://travis-ci.org/FWoelffel/orthanc-client)
An [Orthanc](http://www.orthanc-server.com) REST API client designed for NodeJS.
# Installation
```
$ npm install orthanc-client
```
# Usage
```javascript
var oc = require('orthanc-client');
var client = new oc({
    url: 'http://localhost:8042',
    auth: {
      username: 'foo',
      password: 'bar'
    }
});

client.instances.getAll()
    .then(function(res) {
        console.log(res);
    })
    .catch(function(err) {
        console.log(err);
    });
```
# Documentation
I've written a short documentation for each implemented functions. You can read it in the [DOCUMENTATION.md](https://github.com/FWoelffel/orthanc-client/blob/master/DOCUMENTATION.md) file. Feel free to improve it and send a pull request.
## REST API
You'll find the quick reference for Orthanc's REST API [here](https://docs.google.com/spreadsheets/d/1muKHMIb9Br-59wfaQbDeLzAfKYsoWfDSXSmyt6P4EM8/pub?single=true&gid=22&output=html)
# License
Copyright 2015 - Frédéric Woelffel
Published under the MIT open source license.
See full license in LICENSE.txt