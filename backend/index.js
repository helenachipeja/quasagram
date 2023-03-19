const express = require('express')
const admin = require('firebase-admin');
let inspect = require('util').inspect;
let Busboy = require('busboy');
const app = express()


/*
config-firebase
*/
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


app.get('/posts', (request, response) => {
  response.set('Acess-Control-Allow-Origin', '*')
  let posts = []
  db.collection('posts').orderBy('date', 'desc').get().then(snapshot =>{
    snapshot.forEach((doc) => {
      //console.log(doc.id, '=>', doc.data());
      posts.push(doc.data())
    });
    response.send(posts);
  })
})

/*
endpoint - createPost */

app.post('/createPost', (request, response) => {
  response.set('Acess-Control-Allow-Origin', '*')

    const bb = busboy({ headers: request.headers });

    bb.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      console.log(
        `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
        filename,
        encoding,
        mimeType
      );
      file.on('data', (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      }).on('close', () => {
        console.log(`File [${name}] done`);
      });
    });

    bb.on('field', (name, val, info) => {
      console.log(`Field [${name}]: value: %j`, val);
    });
    bb.on('close', () => {
      console.log('Done parsing form!');
      response.writeHead(303, { Connection: 'close', Location: '/' });
      response.end();
    });
    request.pipe(bb);
  response.send(request.headers)
})

   app.listen(process.env.PORT || 3000);


