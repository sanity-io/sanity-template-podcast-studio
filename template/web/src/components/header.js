import React from 'react'
import {Link} from 'gatsby'

const Header = ({title, subtitle, subscribe, hosts}) => (
  <header>
      <h1>
        <Link to='/'>{title}</Link>
      </h1>
      <h2>{subtitle}</h2>
      <p>With {
        hosts
          .map(({_id, name, twitter}, i) => (<>
            <a key={_id} href={`https://twitter.com/${twitter}`}>{name}</a>
            <span>{
              i === hosts.length - 1
              ? ''
              : i === hosts.length - 2
              ? ', and '
              : ', '
              }</span>
          </>))}
      </p>
        <nav>Subscribe:
        <ul>
          {
          subscribe.links.map(({_key, serviceId, url, name}) => <li key={_key}><a className={serviceId} href={url}>{name}</a></li>)
          }
        </ul>
      </nav>
  </header>
)

export default Header
