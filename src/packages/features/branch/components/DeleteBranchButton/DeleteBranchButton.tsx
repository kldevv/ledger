import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import {
  BranchDocument,
  BranchesDocument,
  useDeleteBranchMutation,
} from '@/api/graphql'
import { Button } from '@/packages/core/components'

export interface DeleteBranchButtonProps {
  /**
   * Branch id
   */
  id: string
  /**
   * Class name
   */
  className?: string
}

export const DeleteBranchButton: React.FC<DeleteBranchButtonProps> = ({
  id,
  className,
}) => {
  const { t } = useTranslation('common')

  const [deleteBranch, { loading }] = useDeleteBranchMutation({
    variables: {
      input: {
        id,
      },
    },
    refetchQueries: [
      {
        query: BranchDocument,
        variables: {
          input: { id },
        },
      },
      {
        query: BranchesDocument,
        variables: {
          input: { active: true },
        },
      },
    ],
  })

  const handleOnClick = useCallback(() => void deleteBranch(), [deleteBranch])

  return (
    <Button
      variant="secondary"
      className={className}
      onClick={handleOnClick}
      loading={loading}
    >
      {t`delete`}
    </Button>
  )
}
