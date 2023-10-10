import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './roleStructure'
import {createClient} from '@sanity/client'

const config = {
  projectId: 'ifcj3xon',
  dataset: 'production',
}

const client = createClient({
  ...config,
  apiVersion: '2023-09-19',
  useCdn: false,
})
//unfortunately, this doesn't work in Safari.
//Safari users will be limited to the initial config
const currentUser = await client.request({
  uri: '/users/me',
  withCredentials: true,
})

// Asuming the orgId == role name
const rolesForUser = currentUser?.roles?.map((role: {name: string}) => role.name)
const museumForUser = await client.fetch(`*[_type == "museum" && orgId in $roles][0]._id`, {
  roles: rolesForUser ?? [],
})

export default defineConfig([
  {
    ...config,
    name: 'default',
    title: 'Museum Project',
    basePath: '/production',
    plugins: [deskTool({structure}), visionTool()],

    schema: {
      types: schemaTypes,
      templates: (prev, context) => {
        // console.log('prev:', prev)
        // return prev

        const typesUsersCanCreate = ['content', 'podcast', 'podcastEpisode']
        const {currentUser} = context
        const isAdmin = currentUser?.roles?.some((role) => role.name === 'administrator')
        //if it's an admin, just give the regular functionality
        if (isAdmin) {
          return prev
        }
        const museumId = museumForUser
        const role = currentUser?.roles?.[0]?.name // IS THIS NEEDED?

        //if they're in an org, filter out the "default" templates, so we ALWAYS
        //create documents with our org id
        const filteredTemplates = prev.filter((template) => {
          return !typesUsersCanCreate.includes(template.id)
        })
        // console.log('filteredTemplates:', filteredTemplates)

        return [
          // ...filteredTemplates,
          ...typesUsersCanCreate.map((type) => {
            return {
              id: type,
              schemaType: type,
              title: `New ${type}`,
              value: {
                museum: {_ref: museumId, _type: 'museum'},
              },
            }
          }),
        ]
      },
    },
  },
])
