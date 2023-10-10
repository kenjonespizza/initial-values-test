import {StructureBuilder} from 'sanity/desk'

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title('Base')
    .items([
      S.listItem().title('Content for museum').child(S.documentList().title('Content').filter('museum._ref == "d30b144c-416e-4f77-8d1f-2c42f0287d3d"')),
    ])
