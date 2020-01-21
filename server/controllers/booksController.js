const fetch = require('node-fetch')
const booksController = {}

//middleware for the fetch request
booksController.getBooks = (req, res, next) => {
  //title information from front-end
  const { title } = req.query
  //URL built from user input
  const URL = `http://openlibrary.org/search.json?title=${title}`
  fetch(URL)
  .then(data => data.json())
  .then(parsed => {
    res.locals.query = parsed
    return next()
  })
  .catch(err => next(err))
}

//parsing middleware to go through results of fetch requests to get pertinent information (titles)
booksController.parseBooks = (req, res, next) => {
  const query = res.locals.query.docs
  //results parsed for titles only
  const results = []
  for (let i = 0; i < query.length; i ++) {
    results.push(query[i].title)
  }
  res.locals.books = results
  return next();
}

module.exports = booksController