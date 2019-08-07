// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import episode from './documents/episode'
import person from './documents/person'
import podcast from './documents/podcast'
import sponsor from './documents/sponsor'
import categories from './objects/categories'
import itunes from './objects/itunes'
import itunesEpisodeSettings from './objects/itunesEpisodeSettings'
import linkListItem from './objects/linkListItem'
import owner from './objects/owner'
import schedule from './objects/schedule'
import social from './objects/social'
import sponsorRead from './objects/sponsorRead'
import photo from './objects/photo'
import { marker, transcription } from './objects/transcription'
import { serviceLink, subscribe } from './objects/subscribe'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    categories,
    itunes,
    owner,
    itunesEpisodeSettings,
    linkListItem,
    schedule,
    social,
    sponsorRead,
    episode,
    person,
    podcast,
    sponsor,
    marker,
    transcription,
    serviceLink,
    subscribe,
    photo
  ])
})
