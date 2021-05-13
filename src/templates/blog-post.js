import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <div className="blog-post-header-top">
            <div>
              {post.frontmatter.categories.map((category, i) => (
                <React.Fragment key={i}>
                  <span className="post-tags">{category}</span>
                  {i < post.frontmatter.categories.length - 1 && ', '}
                </React.Fragment>
              ))}
            </div>

            <span className="book-year">{post.frontmatter.year}</span>
          </div>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <h3>{post.frontmatter.subtitle}</h3>
          <p>by {post.frontmatter.author}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="excerpt"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
        year
        description
        categories
        author
      }
    }
  }
`
