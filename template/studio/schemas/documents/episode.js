import { MdPlayArrow } from 'react-icons/md'
import Player from '../../components/player/'

export default {
  name: 'episode',
  title: 'Episode',
  type: 'document',
  icon: MdPlayArrow,
  fields: [
    {
      name: 'title',
      title: 'Title',
      required: true,
      description: 'Remember that long titles can be truncated in podcast apps',
      type: 'string'
    },
    {
      name: 'schedule',
      type: 'schedule',
      title: 'Publish schedule',
    },
    {
      name: 'file',
      title: 'Podcast media file',
      description:
        'Most podcatchers support .mp3, but other audio-formats may work as well',
      type: 'file',
      inputComponent: Player
    },
    {
      name: 'fileUrl',
      title: 'External location for podcast media file',
      description: 'For when you host your podcast media file elsewhere',
      type: 'url'
    },
    {
      name: 'duration',
      title: 'Duration',
      description: 'HH:MM:SS',
      type: 'string'
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    },
    {
      name: 'explicit',
      title: 'Explicit content',
      type: 'boolean'
    },
    {
      name: 'summary',
      title: 'Summary',
      description: 'An episode summary is a string containing one or more descriptive sentences summarizing your episode for potential listeners. You can specify up to 4000 characters.',
      type: 'text'
    },
    {
      name: 'description',
      title: 'Description',
      description: `An episode description is a string containing one or more sentences describing your episode to potential listeners. You can specify up to 4000 characters.`,
      type: 'text',
      validation: Rule => Rule.max(4000)
    },
    {
      name: 'content',
      title: 'Content',
      description: 'An episode note. Where encoded is a string containing information about your episode.',
      type: 'array',
      of: [{
        type: 'block'
      }]
    },
    {
      name: 'guests',
      type: 'array',
      title: 'Guests',
      description: 'Do you have extra guests in addition to the main hosts?',
      validation: Rule => Rule.unique(),
      of: [
        {type: 'reference', to: [{type: 'person'}]}
      ]
    },
    {
      name: 'linkList',
      title: 'Link list',
      description: 'A more structured way to add links for show notes. Will be compiled at the end of the episode content field in a podcast RSS feed',
      type: 'array',
      of: [
        {
          type: 'linkListItem'
        }
      ]
    },
    {
      name: 'slug',
      title: 'Episode slug',
      type: 'slug',
      description: 'When you need to refer to your podcast episode in a url',
      options: {
        source: 'title',
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 200)
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      options: {
        layout: 'tags'
      },
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'itunes',
      title: 'iTunes Settings',
      type: 'itunesEpisodeSettings',
    },
    {
      name: 'coverArt',
      title: 'Cover art',
      type: 'image'
    },
    {
      name: 'sponsors',
      type: 'array',
      title: 'Sponsors',
      of: [
        { type: 'sponsorRead' }
      ]
    },
    {
      name: 'transcription',
      type: 'transcription',
      title: 'Transcription'
    }
  ],
  orderings: [
    {
      title: 'Publish Date, New',
      name: 'publishDateDesc',
      by: [
        {field: 'schedule.publish', direction: 'desc'}
      ]
    },
    {
      title: 'Publish Date, Old',
      name: 'publishDateAsc',
      by: [
        {field: 'schedule.publish', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      description: 'summary',
      coverArt: 'coverArt',
      file: 'file.asset.url',
      fileUrl: 'file',
      schedule: 'schedule'
    },
    prepare({title, subtitle, description, file, fileUrl, schedule, coverArt,}) {
      const soundURL = file || fileUrl
      const { publish, unpublish } = schedule
      return {
        title,
        subtitle: schedule ? `${new Date(publish).toDateString()}${unpublish ? ` - ${new Date(unpublish).toDateString()}` : ''}` : 'Unscheduled',
        description,
        media: coverArt
      }
    }
  }
};
