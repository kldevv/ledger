import { GetAccountQuery } from '@/api/graphql';
import {
  DescriptionList,
  DescriptionListItem,
  FormattedDate,
} from '@/components/common';
import { useTranslation } from 'next-i18next';

export type AccountDescriptionListData = Exclude<GetAccountQuery['getAccount'], null>

export interface AccountDescriptionListProps {
  /**
   * Transaction detail
   */
  data: AccountDescriptionListData;
}

export const AccountDescriptionList: React.FC<AccountDescriptionListProps> = ({
  data: { id, name, createdDate, updatedDate, category } = {},
}) => {
  const { t } = useTranslation('account');

  const items: DescriptionListItem[] = [
    {
      title: t('AccountDescriptionList.title.id'),
      description: id,
    },
    {
      title: t('AccountDescriptionList.title.name'),
      description: name,
    },
    {
      title: t('AccountDescriptionList.title.category'),
      description: category?.name,
    },
    {
      title: t('AccountDescriptionList.title.createdDate'),
      description: <FormattedDate dateTime={createdDate} />,
    },
    {
      title: t('AccountDescriptionList.title.updatedDate'),
      description: <FormattedDate dateTime={updatedDate} />,
    },
  ];

  return <DescriptionList items={items} />;
};
