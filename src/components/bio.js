/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <div className="bio">
      {author?.name && (
        <div>
          <p><strong className="brand">Book Droplets</strong> is {author?.summary || null}</p>
          <br />
          <p>To submit a book paragraph fill <a href="https://forms.gle/94nd9fHGUuv1n9JBA" target="_blank">this form</a>.</p>
        </div>
      )}
    </div>
  )
}

export default Bio
