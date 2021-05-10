import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div className="nav">
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>

        <Link className="header-link-home" to="/about">
          About
        </Link>
      </div>
    )
  } else {
    header = (
      <div className="nav">
        <Link className="header-link-home" to="/">
          {title}
        </Link>

        <Link className="header-link-home" to="/about">
          About
        </Link>
      </div>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built for the people
      </footer>
    </div>
  )
}

export default Layout
