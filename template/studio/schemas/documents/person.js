import { MdPeople } from 'react-icons/md'

export default {
    name: 'person',
    title: 'Person',
    type: 'document',
    icon: MdPeople,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'email',
            type: 'email',
        },
        {
          name: 'twitter',
          type: 'string',
          title: 'Twitter handle',
          validation: Rule => Rule.regex(/^@.*/).warning('Handle should begin with @')
        },
        {
            name: 'description',
            title: 'Description',
            description: 'Describe your host in the most interesting way',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ]
        },
        {
            name: 'photo',
            type: 'photo',
            title: 'Photo',
        }

    ]
}
