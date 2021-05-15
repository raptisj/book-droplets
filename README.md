# Book Droplets

An open blog that you can look up the first paragraph of any book provided by book lovers.
## Submit a Book

To submit a book paragraph fill <a href="https://forms.gle/94nd9fHGUuv1n9JBA" target="_blank">this form</a>.

All submissions pass through moderation. If something is not clear or wrong your submission will be
ignored. Excerpt must be the first paragraph from the <strong>actual</strong> book, not a preface or someone else's introduction.
The second paragraph may be included as well only if the first is one sentence long.</i>

## Usage

All book information are stored in a CSV file. The following command converts the CSV file data into JSON format(`books.js` in root directory) and creates Markdown files from data(in `content/blog` folder).

```
npm run csvToJson
```