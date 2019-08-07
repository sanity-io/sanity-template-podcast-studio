import { graphql, StaticQuery } from 'gatsby'
import React, { useState } from 'react'
import Layout from '../components/layout'

const query = graphql`
  query SiteTitleQuery {
    podcast: sanityPodcast(_id: { eq: "podcast" }) {
      title
      subtitle
      description
      copyright
      subscribe {
        links {
          _key
          name
          serviceId
          url
        }
      }
      hosts {
        _id
        name
        twitter
      }
    }
  }
`

function LayoutContainer (props) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.podcast) {
          throw new Error(
            'Missing "Podcast". Open the Studio at http://localhost:3333 and some content in "Podcast"'
          )
        }
        return <Layout {...props} podcast={data.podcast} />
      }}
    />
  )
}

export default LayoutContainer
