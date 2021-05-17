import * as React from "react"
import { Link } from "gatsby"
import Moon from "../images/Moon.js"
import Sun from "../images/Sun.js"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  const [theme, setTheme] = React.useState(typeof window !== 'undefined' && localStorage.getItem('theme'))


  if (theme === null) {
    localStorage.setItem('theme', 'light');
    setTheme('light')
  }

  const changeTheme = () => {
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    setTheme(localStorage.getItem('theme'))
  }

  if (isRootPath) {
    header = (
      <div className="nav home">
        <h1 className="main-heading">
          {/* <Link to="/">{document.body.clientWidth < 672 ? <span>Book <br /> Droplets</span> : title}</Link> */}
          <Link to="/"><span>Book <br /> Droplets</span></Link>
        </h1>

        <div className="sub-nav-root">
          <Link className="header-link-home" to="/about">
            About
          </Link>
          <div className="toggler" onClick={changeTheme}>{theme === "light" ? <Moon /> : <Sun />}</div>
        </div>
      </div>
    )
  } else {
    header = (
      <div className="nav">
        <Link className="header-link-home" to="/">
          {title}
        </Link>

        <div className="sub-nav">
          <Link className="header-link-home" to="/about">
            About
          </Link>
          <div className="toggler" onClick={changeTheme}>{theme === "light" ? <Moon /> : <Sun />}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${theme === "light" ? "light" : "dark"} global-wrapper`} data-is-root-path={isRootPath}>
      <div className="container">
        <header className="global-header">{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built for the people
      </footer>
      </div>
    </div>
  )
}

export default Layout
