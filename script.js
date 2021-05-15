const fs = require("fs")
const { render } = require("mustache")
const books = require('./books.json')

const newBooks = [...books]

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
    created_at: getDate(book.created_at)
  }

  const output = render(template, realBook)

  const toKebabCase = makeKebab(book.title)
  const directory = `./content2/${toKebabCase}`

  if (fs.existsSync(directory)) return

  fs.mkdirSync(directory);

  const createStream = fs.createWriteStream(`${directory}/index.md`);
  createStream.end();

  fs.writeFileSync(`${directory}/index.md`, output)
})