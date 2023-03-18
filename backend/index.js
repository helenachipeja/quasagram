const express = require('express')
const app = express()


app.get('/posts', (request, response) => {
  let posts = [{
    caption:'Golden Gate Bridge',
    location:'San Francisco'
  },



{
  caption:'London Eye',
    location:'London'
  }]
})


   //app.listen(process.env.PORT || 3000);


