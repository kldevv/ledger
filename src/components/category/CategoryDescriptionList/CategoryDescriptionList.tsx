import { GetCategoryQuery } from '@/api/graphql';
import { DescriptionList, DescriptionListItem } from '@/components/common';
import { useFormatter } from '@/hooks';
import { useTranslation } from 'react-i18next';

export type AccountDescriptionListData = Exclude<GetCategoryQuery['getCategory'], null | undefined>

export interface AccountDescriptionListProps {
  /**
   * Data
   */
  data: AccountDescriptionListData;
}

export const CategoryDescriptionList: React.FC<AccountDescriptionListProps> = ({
  data: { id, name, type, createdDate, updatedDate },
}) => {
  const { t } = useTranslation('category');
  const { formatDate } = useFormatter();

  const items: DescriptionListItem[] = [
    {
      title: t('category-description-list.title.id'),
      description: id,
    },
    {
      title: t('category-description-list.title.name'),
      description: name,
    },
    {
      title: t('category-description-list.title.type'),
      description: type,
    },
    {
      title: t('category-description-list.title.created-date'),
      description: formatDate(createdDate),
    },
    {
      title: t('category-description-list.title.updated-date'),
      description: formatDate(updatedDate),
    },
  ];

  return <DescriptionList items={items} />;
};
