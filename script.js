const fs = require("fs")
const rimraf = require("rimraf");
const { render } = require("mustache")
const books = require('./books.json')

// filter empty fields
const newBooks = [...books].filter(book => book.title !== "")

const bookPath = './books.json'
const contentPath = './content'

// delete json file
if (fs.existsSync(bookPath)) {
  fs.unlinkSync(bookPath)
}

// delete content folder with all the posts
rimraf.sync(contentPath);

// create empty content folder to be populated later on
if (!fs.existsSync(contentPath)){
  fs.mkdirSync(contentPath);
}

// repopulate json file
fs.writeFileSync(bookPath, JSON.stringify(newBooks))

const getDate = (date) => date.split(' ').shift().split('/').reverse().join('-')

const getYear = (date) => date.split('/').reverse().shift()

const makeKebab = text => {
  const kebabCase = text.split(' ').join('-').toLowerCase()
  return kebabCase
}

const template = fs.readFileSync("./template.md").toString()

newBooks.forEach(book => {
  const realBook = {
    ...book,
    publication_date: getYear(book.publication_date),
    created_at: getDate(book.created_at),
    goodreads_link: encodeURIComponent(book.goodreads_link),
  }

  const output = render(template, realBook)
  const toKebabCase = makeKebab(book.title)
  const directory = `./content/${toKebabCase}`
  
  if (fs.existsSync(directory)) return
  
  fs.mkdirSync(directory);
  
  // const createStream = fs.createWriteStream(`${directory}/index.md`);
  // createStream.end();
  
  // console.log(directory)
  fs.writeFileSync(`${directory}/index.md`, output)

  // setTimeout(() => {
  // }, 6000)
})
