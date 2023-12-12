import { Status } from "@/api/graphql";
import { DescriptionList, DescriptionListItem, StatusChip, Tag } from "@/components/common"
import { useFormatter } from "@/hooks";
import { useTranslation } from "react-i18next";

type Data = {
  /**
   * Id
   */
  id: string;
  /**
   * Note
   */
  note: string;
  /**
   * Status
   */
  status: Status
  /**
   * Tags
   */
  tags: {
    /**
     * Tag id
     */
    id: string
    /**
     * Tag name
     */
    name: string
  }[]
  /**
   * Accrual date
   */
  accrualDate: Date;
  /**
   * Updated date
   */
  updatedDate: Date;
  /**
   * Created date
   */
  createdDate: Date;
};

export interface TransactionDescriptionListProps {
  /**
   * Transaction detail
   */
  data: Data
} 

export const TransactionDescriptionList: React.FC<TransactionDescriptionListProps> = ({
  data: { id, accrualDate, note, status, createdDate, updatedDate, tags },
}) => {
  const { t } = useTranslation('transaction');
  const { formatDate } = useFormatter();

  const items: DescriptionListItem[] = [
    {
      title: t('transaction-description-list.title.id'),
      description: id,
    },
    {
      title: t('transaction-description-list.title.accrualDate'),
      description: formatDate(accrualDate),
    },
    {
      title: t('transaction-description-list.title.note'),
      description: note,
    },
    {
      title: t('transaction-description-list.title.status'),
      description: <StatusChip status={status} />,
    },
    {
      title: t('transaction-description-list.title.tags'),
      description: <div>{tags.map((tag) => <Tag {...tag} />)}</div>
    },
    {
      title: t('transaction-description-list.title.createdDate'),
      description: formatDate(createdDate),
    },
    {
      title: t('transaction-description-list.title.updatedDate'),
      description: formatDate(updatedDate),
    },
  ];

  return <DescriptionList items={items} />;
};