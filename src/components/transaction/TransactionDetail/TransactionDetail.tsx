import { useGetTransactionDetailQuery } from "@/api/graphql"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { TransactionDescriptionList } from ".."
import { EntryTable } from "@/components/entry"

export const TransactionDetail: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const transactionId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id 
  }, [id])

  const { data, loading, error } = useGetTransactionDetailQuery({
    variables: {
      transactionId: transactionId ?? '',
    },
    skip: transactionId == null,
  });
  

  return (
    data?.getTransactionDetail && (
      <div>
        <TransactionDescriptionList
          data={{
            ...data.getTransactionDetail,
          }}
        />
        <h3 className="mt-12 font-semibold text-dark-shades">Transaction Entries</h3>
        <EntryTable data={data.getTransactionDetail.entries} omitTransactionId/>
      </div>
    )
  );
}