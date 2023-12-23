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
      title: t('TransactionDescriptionList.title.id'),
      description: id,
    },
    {
      title: t('TransactionDescriptionList.title.accrualDate'),
      description: <FormattedDate dateTime={accrualDate} />,
    },
    {
      title: t('TransactionDescriptionList.title.note'),
      description: note,
    },
    {
      title: t('TransactionDescriptionList.title.status'),
      description: <StatusChip status={status} />,
    },
    {
      title: t('TransactionDescriptionList.title.tags'),
      description: (
        <div className="flex gap-1 max-w-full flex-wrap">
          {tags?.map((tag) => (
            <Tag {...tag} />
          ))}
        </div>
      ),
    },
    {
      title: t('TransactionDescriptionList.title.createdDate'),
      description: <FormattedDate dateTime={createdDate} />,
    },
    {
      title: t('TransactionDescriptionList.title.updatedDate'),
      description: <FormattedDate dateTime={updatedDate} />,
    },
  ];

  return <DescriptionList items={items} />;
};