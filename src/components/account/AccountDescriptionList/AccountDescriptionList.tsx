import {
  DescriptionList,
  DescriptionListItem,
} from '@/components/common';
import { useFormatter } from '@/hooks';
import { useTranslation } from 'react-i18next';

type Data = {
  /**
   * Id
   */
  id: string;
  /**
   * Status
   */
  name: string;
  /**
   * Category
   */
  category: {
    /**
     * Category id
     */
    id: string;
    /**
     * Category name
     */
    name: string;
  };
  /**
   * Updated date
   */
  updatedDate: Date;
  /**
   * Created date
   */
  createdDate: Date;
};

export interface AccountDescriptionListProps {
  /**
   * Transaction detail
   */
  data: Data;
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
      title: t('account-description-list.title.createdDate'),
      description: formatDate(createdDate),
    },
    {
      title: t('account-description-list.title.updatedDate'),
      description: formatDate(updatedDate),
    },
  ];

  return <DescriptionList items={items} />;
};
