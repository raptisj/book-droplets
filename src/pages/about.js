import * as React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import girlReading from "../images/girl-reading.svg"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  // const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About" />
      <h1>
        About Glance
      </h1>

      <p><span className="brand">Glance</span> is an open-source blog that you can look up the first paragraph of any book provided by the community.</p>
      <p>To submit a book paragraph fill this form <a href="#0">here</a>.</p>
      <p>

      <i>All submissions pass through moderation. If something is not clear or wrong your submission will be ignored.
        Excerpt must be the first paragraph from the <strong>actual</strong> book, not a preface or someone else's introduction.</i>
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
