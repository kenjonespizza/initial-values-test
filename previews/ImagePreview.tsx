import createImageUrlBuilder from '@sanity/image-url'
import React, {useMemo} from 'react'
import {Image, useClient} from 'sanity'

export function ImagePreview(props: { image: Image }) {
  
  const { asset } = props.image
  const client = useClient({apiVersion: '2021-03-25'})
  
  const imageUrlBuilder = useMemo(() =>
      createImageUrlBuilder(client),
      [client])

  const imgSrc = useMemo(() =>
    asset?._ref && imageUrlBuilder.image(asset?._ref)
      .height(150)
      .url(),
      [asset?._ref, imageUrlBuilder]
)

  if (!imgSrc) {
    return null
  }

  return <img style={{ margin: 4 }} src={imgSrc} alt='' />
}