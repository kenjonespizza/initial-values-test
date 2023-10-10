import {defineField, defineType} from 'sanity'
import {MdBusiness as icon} from 'react-icons/md'

export default defineType({
  name: 'museum',
  title: 'Museum',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orgId',
      title: 'Organization ID',
      type: 'string',
      readOnly: ({currentUser}) => !currentUser?.roles?.some((role) => role.name === 'administrator'),
    }),
  ],
})
