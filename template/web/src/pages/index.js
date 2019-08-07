import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../containers/layout'
import EpisodePreview from '../components/episodePreview'
import { isPublished } from '../lib/helpers'

/*  */export const query = graphql`{
  episodes: allSanityEpisode(filter: {schedule: {publish: {ne: null}}}) {
    edges {
      node {
        id
        title
        slug {
          current
        }
        description
        schedule {
          publish
        }
        duration
        guests {
          id
          name
          twitter
        }
      }
    }
  }
}
`

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const { episodes } = data

  return (
    <Layout>
      <main className="container">
        {
          episodes.edges
            .filter(isPublished)
            .map(EpisodePreview)
        }
      </main>
    </Layout>
  )
}

export default IndexPage
