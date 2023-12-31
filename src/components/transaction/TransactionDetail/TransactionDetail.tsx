import { EntryStatus, useGetTransactionDetailQuery } from "@/api/graphql"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { TransactionDescriptionList } from ".."
import { EntryTable } from "@/components/entry"
import { useTranslation } from "next-i18next"

export const TransactionDetail: React.FC = () => {
  const { t } = useTranslation('transaction')
  const router = useRouter()
  const { id } = router.query

  const transactionId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id 
  }, [id])

  const { data, loading, error } = useGetTransactionDetailQuery({
    variables: {
      getTransactionInput: {
        id: transactionId ?? ''
      },
      getEntriesInput: {
        transactionId
      }
    },
    skip: transactionId == null,
  });
  

  return (
    data?.getTransaction && (
      <div>
        <TransactionDescriptionList
          data={{
            ...data.getTransaction,
            status: data.getEntries.some(
              ({ status }) => status === EntryStatus.PENDING
            )
              ? EntryStatus.PENDING
              : EntryStatus.COMPLETED,
          }}
        />
        <h3 className="mt-12 font-semibold text-dark-shades">{t`TransactionDetail.title.entries`}</h3>
        <EntryTable data={data.getEntries} />
      </div>
    )
  );
}