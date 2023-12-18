import { GetTagQuery } from '@/api/graphql';
import { DescriptionList, DescriptionListItem, FormattedDate } from '@/components/common';
import { useTranslation } from 'react-i18next';

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

export const TagDescriptionList: React.FC<TagDescriptionListProps> = ({data: { id, name, createdDate, updatedDate}}) => {
  const { t } = useTranslation('tag');
  const items: DescriptionListItem[] = [
    {
      title: t('tag-description-list.title.id'),
      description: id,
    },
    {
      title: t('tag-description-list.title.name'),
      description: name,
    },
    {
      title: t('tag-description-list.title.created-date'),
      description: <FormattedDate dateTime={createdDate} />,
    },
    {
      title: t('tag-description-list.title.updated-date'),
      description: <FormattedDate dateTime={updatedDate} />,
    },
  ];

  return <DescriptionList items={items} />;
};
