import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
// import { categories } from '../constants'
// import openBook from '../images/open-book.svg'

import { navigate, useLocation } from "@reach/router"
import Fuse from "fuse.js"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const params = new URLSearchParams(location.search)
  const defaultQuery = params.get("search") || ""
  const defaultTagQuery = params.get("tag") || ""
  const [query, setQuery] = useState(defaultQuery)
  const [activeTag, setActiveTag] = useState(defaultTagQuery)
  const [searchedPosts, setSearchedPosts] = useState(posts)
  const [filteredPosts, setFilteredPosts] = useState(posts)

  const fuse = new Fuse(posts, {
    keys: ["frontmatter.title", "frontmatter.author"], threshold: 0.3,
  })

  const filterPosts = query => {
    if (!query) {
      return posts
    }

    const filteredPosts = fuse.search(query)
      .map(result => result.item)
      .filter(post => defaultTagQuery !== '' ? post.frontmatter.categories.includes(defaultTagQuery) : 1)

    return filteredPosts
  }

  useEffect(() => {
    params[query ? 'set' : 'delete']("search", query)
    navigate(query ? `?${params}` : '/', { replace: true })

    const newPosts = filterPosts(query)
 
    setSearchedPosts(newPosts)
  }, [query])
  
  const onChange = event => {
    setQuery(event.target.value)
  }
  
  const tagSet = new Set()
  
  searchedPosts.forEach(post => {
    if (post.frontmatter.categories) {
      post.frontmatter.categories.forEach((category) => {
        tagSet.add(category)
      })
    }
  })
  
  const tagList = Array.from(tagSet)
  
  const filterByTag = (tag) => {
      setActiveTag(tag)
      
      params[tag !== 'all' ? 'set' : 'delete']("tag", tag)
      navigate(tag !== 'all' ? `?${params}` : '/', { replace: true })
      
      const newPosts = searchedPosts.filter(post => post.frontmatter.categories.includes(tag))

      setSearchedPosts(tag === 'all' ? posts : newPosts)
      setQuery(tag === 'all' ? '' : query)

    return newPosts
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <Bio />

      {/* <img src={openBook} alt="reading book" className="opening-image" /> */}

      <input
        className="search-input"
        placeholder="search book or author"
        value={query}
        onChange={onChange}
      />

      <div className="tags-menu">
        {tagList.length > 0 &&
          <span className={activeTag === 'all' ? 'active' : ''} onClick={() => filterByTag('all')}>all</span>}

        {tagList.map((tag) => (
          <span className={activeTag === tag ? 'active' : ''} key={tag} onClick={() => filterByTag(tag)}>{tag}</span>
        ))}
      </div>

      {searchedPosts.length === 0 && (
        <i><h3>No book found</h3></i>
      )}

      <ol style={{ listStyle: `none` }}>
        {searchedPosts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.fields.slug} itemProp="url">
                  <header>
                    <h2>
                      <span itemProp="headline">{title}</span>
                    </h2>
                    <br />
                    <p>{post.frontmatter.author}</p>
                  </header>
                </Link>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

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
          author
          categories
        }
      }
    }
  }
`