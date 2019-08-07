import {format, isFuture} from 'date-fns'

export function isPublished({node}) {
  // I've kept this more verbose than probably needed
  if (!node.schedule) {
    return false
  }
  // If episode has an unpublish date, check if it's in the future
  if (node.schedule.unpublish && !isFuture(node.schedule.unpublish)) {
    return false
  }
  // Check if the episode’s publish date is not in the future
  return !isFuture(node.schedule.publish)
}

export function filterOutDocsPublishedInTheFuture({publishedAt}) {
  return !isFuture(publishedAt)
}

export function getBlogUrl (publishedAt, slug) {
  return `/blog/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`
}

export function buildImageObj (source = { asset: {}}) {
  const imageObj = {
    asset: {_ref: source.asset._ref || source.asset._id}
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function toPlainText(blocks) {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}
