import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useTreasuryBookContext } from '@/hooks'

import { TreasuryBookDescriptionList } from '..'

export const TreasuryBookDetails: React.FC = () => {
  const router = useRouter()
  const {
    data,
    state: { loading },
  } = useTreasuryBookContext()

  const { id } = router.query
  const treasuryBookId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const descriptionListData = useMemo(
    () => data?.treasuryBooks.find(({ id }) => id === treasuryBookId),
    [data?.treasuryBooks, treasuryBookId],
  )

  return (
    <div>
      <TreasuryBookDescriptionList
        data={descriptionListData}
        loading={loading}
      />
    </div>
  )
}
