import { GetAccountQuery } from '@/api/graphql';
import {
  DescriptionList,
  DescriptionListItem,
  FormattedDate,
} from '@/components/common';
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
      description: <FormattedDate dateTime={createdDate} />,
    },
    {
      title: t('account-description-list.title.updated-date'),
      description: <FormattedDate dateTime={updatedDate} />,
    },
  ];

  return <DescriptionList items={items} />;
};
