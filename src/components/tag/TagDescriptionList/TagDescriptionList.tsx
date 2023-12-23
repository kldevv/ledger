import { GetTagQuery } from '@/api/graphql';
import {
  DescriptionList,
  DescriptionListItem,
  FormattedDate,
} from '@/components/common';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

export type TagDescriptionListData = Exclude<
  GetTagQuery['getTag'],
  null | undefined
>;

export interface TagDescriptionListProps {
  /**
   * Data
   */
  data: TagDescriptionListData;
}

export const TagDescriptionList: React.FC<TagDescriptionListProps> = ({
  data: { id, name, createdDate, updatedDate },
}) => {
  const { t } = useTranslation('tag');

  const items: DescriptionListItem[] = useMemo(
    () => [
      {
        title: t('TagDescriptionList.title.id'),
        description: id,
      },
      {
        title: t('TagDescriptionList.title.name'),
        description: name,
      },
      {
        title: t('TagDescriptionList.title.createdDate'),
        description: <FormattedDate dateTime={createdDate} />,
      },
      {
        title: t('TagDescriptionList.title.updatedDate'),
        description: <FormattedDate dateTime={updatedDate} />,
      },
    ],
    [t, id, name, createdDate, updatedDate]
  );

  return <DescriptionList items={items} />;
};
