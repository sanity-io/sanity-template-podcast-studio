import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../containers/layout'
import Player from '../components/player.js'
import PortableText from '../components/portableText.js'

export const query = graphql`
  query BlogPostTemplateQuery($slug: String!) {
    episode: sanityEpisode(slug: { current: { eq: $slug } }) {
      _id
      title
      slug {
        current
      }
      duration
      description
      _rawContent(resolveReferences: {maxDepth: 10})
      schedule {
        publish(formatString: "MMMM DD, YYYY")
      }
      fileUrl
        file {
          asset {
            mimeType
            url
          }
        }
    }
  }
`

const EpisodeTemplate = ({
  data: { episode: { slug = {}, title, schedule = {}, duration, description,  _rawContent, fileUrl,file = {} } }
}) => {
  return (
    <Layout>
      <Link to="/">← Back to episodes</Link>
      <h3>
        <a href={`/episode/${slug.current}`}>{title}</a>
      </h3>
      <small>
        {schedule.publish} | {duration} | E001
      </small>
      <p>{description}</p>
      {(fileUrl || file.asset.url) && <Player fileUrl={fileUrl || file.asset.url} mimeType={file.asset.mimeType} />}
      <PortableText blocks={_rawContent} />

    </Layout>
  )
}

export default EpisodeTemplate
