import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const categories = post.frontmatter.categories
  const genreRecommendation = post.frontmatter.genre_recommendation

  const categorySet = new Set()

  if (categories) {
    categories.forEach((category) => {
      if (category === 'other') {
        categorySet.add(genreRecommendation)
      }

      if (category !== 'other') {
        categorySet.add(category)
      }
    })
  }

  const categoryList = Array.from(categorySet)

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
              {categoryList.filter(Boolean).map((category, i) => (
                <React.Fragment key={i}>
                  <span className="post-tags">{category}</span>
                  {i < categories.length - 1 && categoryList.length > 1 && categoryList[0] !== "" && categoryList[1] !== "" && ', '}
                </React.Fragment>
              ))}
            </div>

            <span className="book-year">{post.frontmatter.publication_date}</span>
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

        {post.frontmatter.goodreads_link && <a href={decodeURIComponent(post.frontmatter.goodreads_link)} target="_blank">on Goodreads</a>}
        
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
        publication_date
        description
        categories
        genre_recommendation
        author
        goodreads_link
      }
    }
  }
  `
  