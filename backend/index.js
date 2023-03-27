const express = require('express')
const admin = require('firebase-admin');
let inspect = require('util').inspect;
let Busboy = require('busboy');
const app = express()
let path = require('path')
let os = require('os')
let fs = require('fs')
let UUID = require('uuid-v4')


/*
config-firebase
*/
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "<BUCKET_NAME>quasagram-529be.appspot.com"
});

const db = admin.firestore();
let bucket = admin.storage().bucket();


app.get('/posts', (request, response) => {
  response.set('Acess-Control-Allow-Origin', '*');
  let posts = [];
  db.collection('posts').orderBy('date', 'desc').get().then(snapshot =>{
    snapshot.forEach((doc) => {
      //console.log(doc.id, '=>', doc.data());
      posts.push(doc.data());
    });
    response.send(posts);
  })
})

/*
endpoint - createPost */

app.post('/createPost', (request, response) => {
  response.set('Acess-Control-Allow-Origin', '*')

  let uuid = UUID()

  const bb = new Busboy({ headers: request.headers });


  let fields = {}
  let fileData = {}

    bb.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      console.log(
        `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
        filename,
        encoding,
        mimeType
      );
       let filepath = path.join(os.tmpdir(), filename)
       file.pipe(fs.createWriteStream(filepath))
       fileData = { filepath, mimetype}
    });

    bb.on('field', (name, val, info) => {
      fields[fieldname] = val
    });

    bb.on('close', () => {

      bucket.upload(
        fileData.filepath,
        {
          uploadType: 'media',
          metadata: {
            metadata:{
              contentType: fileData.mimetype,
              firebaseStorageDownloadTokens: uuid
            }
          }
        },
        (err, uploadedFile ) => {
         if (!err) {
          createDocument(uploadedFile)
         }
        }
      )
      function createDocument(uploadedFile) {
        db.collection('posts').doc(fields.id).set({
          id: fields.id,
          caption: fields.caption,
          location: fields.location,
          date: parseInt(fields.date),
          imageUrl:'https://firebasestorage.googleapis.com/v0/b/${ bucket.name }/o/${ uploadedFile.name }?alt=media&token=${ uuid }'
        }).then(() => {
          response.send('Post added: ' + fields.id)
        })
      }
    });
    request.pipe(bb);
})

   //app.listen(process.env.PORT || 3000);
   module.exports = app;



