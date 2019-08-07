import React from 'react'
import Header from './header'


const Layout = ({children, podcast}) => console.log(podcast) || (
  <>
    <Header {...podcast} />
    <>{children}</>
    <footer>
      <div>
        <div>
          &copy; {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a>{' '}
          &amp;
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </div>
      </div>
    </footer>
  </>
)

export default Layout
