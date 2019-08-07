const {  format, isFuture } = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 async function createEpisodePages (graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      episodes: allSanityEpisode(
        filter: { slug: { current: { ne: null } }, schedule: {publish: { ne: null } } }
      ) {
        edges {
          node {
            id
            schedule {
              publish
              unpublish
            }
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const episodeEdges = (result.data.episodes || {}).edges || []

  episodeEdges
    .filter(({node = {}}) => !isFuture(node.schedule.publish))
    .filter(({node = {}}) => (node.scedule && node.scedule.unpublish) ? isFuture(node.scedule.unpublish) : true)
    .forEach((edge, index) => {
      const { id, slug = {} } = edge.node
      const path = `/episode/${slug.current}/`

      reporter.info(`Creating episode post page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/episode.js'),
        context: { id, slug: slug.current }
      })
    })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createEpisodePages(graphql, actions, reporter)
}

