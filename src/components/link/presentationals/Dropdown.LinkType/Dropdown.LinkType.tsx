import type { FieldValues } from 'react-hook-form'

import { useTranslation } from 'next-i18next'

import { LinkType } from '@/api/graphql'
import { Form } from '@/components/core/containers'

import type { FormDropdownProps } from '@/components/core/containers/Form/Form.Dropdown/Form.Dropdown'

export interface DropdownLinkTypeProps<TFieldValues extends FieldValues>
  extends Omit<FormDropdownProps<TFieldValues, LinkType>, 'items'> {}

export const DropdownLinkType = <TFieldValues extends FieldValues>(
  props: DropdownLinkTypeProps<TFieldValues>,
) => {
  const { t } = useTranslation('link')

  return (
    <Form.Dropdown<TFieldValues, LinkType>
      {...props}
      items={Object.values(LinkType).map((type) => ({
        id: type,
        value: type,
        title: t(`linkType.${type}`),
      }))}
    />
  )
}
