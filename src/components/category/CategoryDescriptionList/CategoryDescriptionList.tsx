import { GetCategoryQuery } from '@/api/graphql';
import { DescriptionList, DescriptionListItem, FormattedDate } from '@/components/common';
import { useTranslation } from 'next-i18next';

export type CategoryDescriptionListData = Exclude<GetCategoryQuery['getCategory'], null | undefined>

export interface CategoryDescriptionListProps {
  /**
   * Data
   */
  data: CategoryDescriptionListData;
}

export const CategoryDescriptionList: React.FC<CategoryDescriptionListProps> = ({
  data: { id, name, type, createdDate, updatedDate },
}) => {
  const { t } = useTranslation('category');

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
      description: <FormattedDate dateTime={createdDate} />,
    },
    {
      title: t('category-description-list.title.updated-date'),
      description: <FormattedDate dateTime={updatedDate} />,
    },
  ];

  return <DescriptionList items={items} />;
};
