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
  response.send(posts)

})

app.listen(3000)

