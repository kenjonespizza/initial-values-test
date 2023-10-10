import {defineField, defineType} from 'sanity'
import {GiSoundWaves as icon} from 'react-icons/gi'

export default defineType({
  name: 'podcastEpisode',
  title: 'Podcast Episode',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'museum',
      title: 'Museum',
      type: 'reference',
      to: [{type: 'museum'}],
      readOnly: ({currentUser}) =>
        !currentUser?.roles?.some((role) => role.name === 'administrator'),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'string',
    }),
    defineField({
      name: 'seasonNumber',
      title: 'Season Number',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'podcastUrl',
      title: 'Podcast url',
      type: 'string',
    }),
    defineField({
      name: 'podcastId',
      title: 'Podcast ID',
      type: 'string',
    }),
    defineField({
      name: 'podcastGuid',
      title: 'Podcast GUID',
      type: 'string',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published date',
      type: 'date',
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      episodeNumber: 'episodeNumber',
      season: 'episodeSeason',
      images: 'images',
    },
    prepare(selection) {
      const {title, episodeNumber, season, images} = selection
      return {
        title: title,
        subtitle: `EP:${episodeNumber} S:${season}`,
        media: images.length > 0 ? images[0] : null,
      }
    },
  },
})
