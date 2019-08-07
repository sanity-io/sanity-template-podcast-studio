import React from 'react'
import PortableTextToReact from '@sanity/block-content-to-react'

const serializers = {}

const PortableText = ({blocks}) => <PortableTextToReact blocks={blocks} serializers={serializers} />

export default PortableText
