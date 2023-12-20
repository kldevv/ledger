import { GetAccountQuery } from '@/api/graphql';
import {
  DescriptionList,
  DescriptionListItem,
} from '@/components/common';
import { useFormatter } from '@/hooks';
import { useTranslation } from 'next-i18next';

export type AccountDescriptionListData = Exclude<GetAccountQuery['getAccount'], null | undefined>

export interface AccountDescriptionListProps {
  /**
   * Transaction detail
   */
  data: AccountDescriptionListData;
}

export const AccountDescriptionList: React.FC<AccountDescriptionListProps> = ({
  data: { id, name, createdDate, updatedDate, category },
}) => {
  const { t } = useTranslation('account');
  const { formatDate } = useFormatter();

  const items: DescriptionListItem[] = [
    {
      title: t('account-description-list.title.id'),
      description: id,
    },
    {
      title: t('account-description-list.title.name'),
      description: name,
    },
    {
      title: t('account-description-list.title.category'),
      description: category.name,
    },
    {
      title: t('account-description-list.title.created-date'),
      description: formatDate(createdDate),
    },
    {
      title: t('account-description-list.title.updated-date'),
      description: formatDate(updatedDate),
    },
  ];

  return <DescriptionList items={items} />;
};
