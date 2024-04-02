import { TagType } from '@/api/graphql'

import type { SolidIconProps } from '@/components/core/presentationals'

export const tagTypeToSolidIconName = (
  type?: TagType,
): SolidIconProps['name'] => {
  switch (type) {
    case TagType.PEOPLE:
      return 'UserCircle'
    case TagType.ORGANIZATION:
      return 'Briefcase'
    case TagType.PROPERTY:
      return 'HomeModern'
    case TagType.TRAVEL:
      return 'GlobeAsiaAustralia'
    default:
      return 'Tag'
  }
}
