const express = require('express');
const app = express();
const path = require('path')
const PORT = 3000;
const booksController = require('./controllers/booksController')

//server html
app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '../client/index.html'))
})

//request for book titles from api that is parsed and sent back as a list
app.get('/book', booksController.getBooks, booksController.parseBooks, (req, res) => {
  res.json(res.locals.books)
})

//404 handler
app.use('*', (req, res) => {
  res.sendStatus(404);
});
//global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});