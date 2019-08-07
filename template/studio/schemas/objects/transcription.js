export const marker = {
  name: 'marker',
  type: 'object',
  title: 'Marker',
  fields: [
    {
      name: 'speaker',
      type: 'reference',
      title: 'Speaker',
      to: [{type: 'person'}]
    },
    {
      name: 'in',
      type: 'number',
      title: 'Duration from (seconds)'
    },
    {
      name: 'out',
      type: 'number',
      title: 'Duration to (seconds)'
    },
    {
      name: 'comment',
      type: 'text',
      title: 'Comment'
    }
  ]
}

export const transcription = {
  name: 'transcription',
  type: 'object',
  title: 'Transcription',
  fields: [
    {
      name: 'content',
      type: 'array',
      of: [
        { type: 'marker' }
      ]
    }
  ]
}
