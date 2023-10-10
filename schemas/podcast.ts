import {defineField, defineType} from 'sanity'
import {CgMediaPodcast as icon} from 'react-icons/cg'

export default defineType({
  name: 'podcast',
  title: 'Podcast',
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
  ],
})
