import {defineField, defineType} from 'sanity'
import {BsFilePost as icon} from 'react-icons/bs'

export default defineType({
  name: 'content',
  title: 'Content',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'type',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Podcast', value: 'podcast'},
          {title: 'Exhibit', value: 'exhibit'},
          {title: 'Class', value: 'class'},
          {title: 'Livestream', value: 'livestream'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
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
    defineField({
      name: 'podcastEpisode',
      type: 'reference',
      to: [{type: 'podcastEpisode'}],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'bodyCarousel',
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      // initialValue: new Date().toDateString(),
    }),
  ],
})
