import S from '@sanity/desk-tool/structure-builder'
import { MdDashboard, MdSettings } from 'react-icons/md'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
  !['podcast', 'episode', 'person', 'sponsor'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Podcast')
    .items([
      S.listItem()
        .title('Podcast')
        .schemaType('podcast')
        .child(
          S.editor()
            .id('podcast')
            .schemaType('podcast')
            .documentId('podcast')
        ),
      S.listItem()
        .title('Episodes')
        .schemaType('episode')
        .child(
          S.list()
            .title('Episodes')
            .id('episodes')
            .items([
              S.listItem()
                .title('Future Episodes')
                .schemaType('episode')
                .child(
                  S.documentList()
                    .title('Future Episodes')
                    .menuItems(S.documentTypeList('episode').getMenuItems())
                    .filter('_type == $type && schedule.publish > now()')
                    .params({ type: 'episode' })
                ),
              S.listItem()
                .title('Published Episodes')
                .schemaType('episode')
                .child(
                  S.documentList()
                    .title('Published Episodes')
                    .menuItems(S.documentTypeList('episode').getMenuItems())
                    .filter(
                      '_type == $type && schedule.publish < now() && (!defined(schedule.unpublish) || schedule.unpublish > now())'
                    )
                    .params({ type: 'episode' })
                ),
              S.listItem()
                .title('Unpublished Episodes')
                .schemaType('episode')
                .child(
                  S.documentList()
                    .title('Unpublished Episodes')
                    .menuItems(S.documentTypeList('episode').getMenuItems())
                    .filter('_type == $type && schedule.unpublish < now()')
                    .params({ type: 'episode' })
                ),
              S.listItem()
                .title('All Episodes')
                .schemaType('episode')
                .child(S.documentTypeList('episode').title('All Episodes'))
            ])
        ),
      S.listItem()
        .title('Persons')
        .schemaType('person')
        .child(S.documentTypeList('person').title('Persons')),
      S.listItem()
        .title('Sponsors')
        .schemaType('sponsor')
        .child(S.documentTypeList('sponsor').title('Sponsors')),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
