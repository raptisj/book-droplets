const fs = require("fs")
const rimraf = require("rimraf");
const { render } = require("mustache")
const books = require('./books.json')

const replacements = {
  'Χρονική σήμανση': 'created_at',
  'Title': 'title',
  'Subtitle': 'subtitle',
  'Author': 'author',
  'Publication date': 'publication_date',
  'Genre': 'genre',
  'Complementary genre': 'complementary_genre',
  'Genre Recommendation': 'genre_recommendation',
  'Excerpt': 'excerpt',
  'Goodreads Link': 'goodreads_link',
};


const formatBookKeys = books.map(book => {
  
  let replacedItems = Object.keys(book).map((key) => {
    const newKey = replacements[key] || key;
    return { [newKey] : book[key] };
  });
  
  const newTab = replacedItems.reduce((a, b) => Object.assign({}, a, b));
  
  return newTab  
})

// filter empty fields
const newBooks = [...formatBookKeys].filter(book => book.title !== "")

const bookPath = './books.json'
const contentPath = './content'

// delete json file
if (fs.existsSync(bookPath)) {
  fs.unlinkSync(bookPath)
}

// delete content folder with all the posts
rimraf.sync(contentPath);

// create empty content folder to be populated later on
if (!fs.existsSync(contentPath)) {
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

  fs.writeFileSync(`${directory}/index.md`, output)
})
