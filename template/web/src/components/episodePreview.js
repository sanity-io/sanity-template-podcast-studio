import React from 'react'
import { format } from 'date-fns'

function EpisodePreview ({node}) {
  const { id, title, description, duration, schedule = {}, slug = {} } = node
  return (
    <article className="episode" key={id}>
      <h3>
        <a href={`/episode/${slug.current}`}>{title}</a>
      </h3>
      <small>
        {format(schedule.publish, 'MM dd, YY')} | {duration} | E001
      </small>
      <p>{description}</p>
    </article>
  )
}

export default EpisodePreview
