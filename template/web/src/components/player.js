import React from 'react'

const findMimeType = (fileUrl = '') => 'audio/' + fileUrl.split('.')[fileUrl.split('.').length - 1]

const Player = ({ fileUrl, mimeType }) => (
  <audio controls>
    <source src={fileUrl} type={`${mimeType || findMimeType(fileUrl)}`} />{' '}
    <p>
      Your browser doesn't support HTML5 audio. Here is a{' '}
      <a href={fileUrl}>link to the audio</a> instead.
    </p>
  </audio>
)

export default Player
