import { useGetTagDetailQuery } from '@/api/graphql';
import { useVaultContext } from '@/hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { TagDescriptionList } from '..';
import { useTranslation } from 'next-i18next';
import { TransactionTable } from '@/components/transaction';

export const TagDetail: React.FC = () => {
  const { t } = useTranslation('tag')
  const router = useRouter();
  const { id } = router.query;
  const [{ curVaultId }] = useVaultContext();

  const tagId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id;
  }, [id]);

  const { data } = useGetTagDetailQuery({
    variables: {
      getTagInput: { id: tagId ?? '' },
      getTransactionsInput: { vaultId: curVaultId ?? '', tagId },
    },
    skip: tagId == null || curVaultId == null,
  });

  return (
    data?.getTag && (
      <div>
        <TagDescriptionList data={data?.getTag} />
        <h3 className="mt-12 font-semibold text-dark-shades">
          {t('tag-detail.header.transactions')}
        </h3>
        <TransactionTable data={data.getTransactions ?? []}/>
      </div>
    )
  );
};
