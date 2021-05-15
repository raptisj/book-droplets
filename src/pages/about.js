import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import girlReading from "../images/girl-reading.svg"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About" />

      <h1>
        About Book Droplets
      </h1>

      <p><span className="brand">Book Droplets</span> is an open blog that you can look up the first paragraph of any book provided by book lovers.</p>

      {/* <p>To submit a book paragraph fill <a href="https://forms.gle/94nd9fHGUuv1n9JBA" target="_blank">this form</a>.</p> */}

      <h3>Why</h3>

      <p>
        Many times I have found myself trying to figure out if I want to read a book that a friend of someone recommended.
        There are  reviews, overviews of the book and whole chapters online to preview for free. But I rarely found myself
        reading them. I found — and many other people I know agree — that the first paragraph is the most helpful and the one
        that set's the tone for the rest of the book. That is how I decide , for the most part, if I'm going to read a book.
        If you hadn't given care in your opening lines then you didn't put enough care in the rest of the book for that matter. Usually you can get a
        feel of the author's writing style from the very first lines. Let some intuition kick in as well and you got a situation going.
      </p>

      <h3>Note</h3>
      <p>
        <i>
          All submissions pass through moderation. If something is not clear or wrong your submission will be
        ignored. Excerpt must be the first paragraph from the <strong>actual</strong> book, not a preface or someone else's introduction.
        The second paragraph may be included as well only if the first is one sentence long.</i>
      </p>

      <p>Happy sample reading!!!</p>

      <img src={girlReading} alt="girl reading" className="opening-image" />
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
