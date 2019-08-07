export default {
  name: 'owner',
  type: 'object',
  title: 'Podcast owner',
  description:
    'The name and email of the person or organization that iTunes should list in their different views',
  fields: [
    {
      name: 'email',
      type: 'email'
    },
    {
      name: 'name',
      type: 'string'
    }
  ]
}
