import {
  CalculatorIcon,
  GlobeAsiaAustraliaIcon,
  HomeModernIcon,
  TagIcon,
  UserIcon,
} from '@heroicons/react/20/solid'

import { TagType } from '@/api/graphql'

const iconCn = 'size-5'

export const getTagTypeIcon = (type?: TagType) => {
  switch (type) {
    case TagType.PEOPLE:
      return <UserIcon className={iconCn} />
    case TagType.ORGANIZATION:
      return <CalculatorIcon className={iconCn} />
    case TagType.PROPERTY:
      return <HomeModernIcon className={iconCn} />
    case TagType.TRAVEL:
      return <GlobeAsiaAustraliaIcon className={iconCn} />
    default:
      return <TagIcon className={iconCn} />
  }
}
