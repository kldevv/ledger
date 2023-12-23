import { EntryStatus, GetTransactionDetailQuery } from "@/api/graphql";
import { DescriptionList, DescriptionListItem, FormattedDate, StatusChip, Tag } from "@/components/common"
import { useTranslation } from "next-i18next";

type TransactionDescriptionListData = Exclude<GetTransactionDetailQuery['getTransaction'], null> & {
  /**
   * Summary of the entries status
   */
  status: EntryStatus
};

export interface TransactionDescriptionListProps {
  /**
   * Transaction detail
   */
  data: TransactionDescriptionListData;
} 

export const TransactionDescriptionList: React.FC<TransactionDescriptionListProps> = ({
  data: { id, accrualDate, note, status, createdDate, updatedDate, tags } = {},
}) => {
  const { t } = useTranslation('transaction');

  const items: DescriptionListItem[] = [
    {
      title: t('transaction-description-list.title.id'),
      description: id,
    },
    {
      title: t('transaction-description-list.title.accrualDate'),
      description: <FormattedDate dateTime={accrualDate} />,
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
      description: (
        <div className="flex gap-1 max-w-full flex-wrap">
          {tags?.map((tag) => (
            <Tag {...tag} />
          ))}
        </div>
      ),
    },
    {
      title: t('transaction-description-list.title.createdDate'),
      description: <FormattedDate dateTime={createdDate} />,
    },
    {
      title: t('transaction-description-list.title.updatedDate'),
      description: <FormattedDate dateTime={updatedDate} />,
    },
  ];

  return <DescriptionList items={items} />;
};