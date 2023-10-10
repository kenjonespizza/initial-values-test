import {ListBuilder, ListItemBuilder, StructureResolver} from 'sanity/desk'
import {createClient} from '@sanity/client'
import {SchemaType} from 'sanity'

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
console.log('currentUser:', currentUser)

// Asuming the orgId == role name
const rolesForUser = currentUser?.roles?.map((role: {name: string}) => role.name)
console.log('rolesForUser:', rolesForUser)
const museumForUser = await client.fetch(`*[_type == "museum" && orgId in $roles][0]`, {
  roles: rolesForUser ?? [],
})

export const structure: StructureResolver = (S, context) => {
  const {currentUser} = context
  const isAdmin = currentUser?.roles?.some((role) => role.name === 'administrator')
  //if admin, return everything as it was
  if (isAdmin) {
    return S.list()
      .title('Content')
      .items([...S.documentTypeListItems()])
  }
  //const role = currentUser?.roles?.[0]?.name

  const itemsWithRoleFilter = S.documentTypeListItems()
    .map((item) => {
      const schemaType = (item.getSchemaType() as SchemaType)?.name

      switch (schemaType) {
        case 'museum':
          return S.documentTypeListItem(schemaType).child(
            S.documentTypeList(schemaType)
              .filter('_type == "museum" && orgId == $museumOrgId')
              .params({museumOrgId: museumForUser?.orgId})
          )
        case 'content':
          return S.documentTypeListItem(schemaType).child(
            S.documentTypeList(schemaType)
              .filter('_type == $type && museum._ref == $museumId')
              .params({type: schemaType, museumId: museumForUser?._id})
          )
        case 'podcastEpisode':
          return undefined
        default:
          return S.documentTypeListItem(schemaType).child(
            S.documentTypeList(schemaType)
              .filter('_type == $type && museum._ref == $museumId')
              .params({type: schemaType, museumId: museumForUser?._id})
          )
      }
    })
    .filter((i): i is ListItemBuilder => i !== undefined)
  // Instead of filter(Boolean) that doesn't play well with TS

  return S.list()
    .title('Content')
    .items([...itemsWithRoleFilter])
}
