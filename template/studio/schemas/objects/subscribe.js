export const serviceLink = {
  name: 'serviceLink',
  type: 'object',
  title: 'Service',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: Rule => Rule.uri({allowRelative: true})
    },
    {
      name: 'serviceId',
      type: 'string',
      title: 'Service ID',
      description: 'For matching in templates etc.'
    }
  ]
}
export const subscribe = {
  name: 'subscribe',
  type: 'object',
  title: 'Subscription links',
  fields: [
    {
      name: 'links',
      type: 'array',
      validation: Rule => Rule.unique(),
      of: [
        {type: 'serviceLink'}
      ]
    }
  ]
}
