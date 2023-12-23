import { useGetAccountDetailQuery } from '@/api/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { EntryTable } from '@/components/entry';
import { AccountDescriptionList } from '../AccountDescriptionList/AccountDescriptionList';
import { useTranslation } from 'next-i18next';

export const AccountDetail: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('account')
  const { id } = router.query;

  const accountId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id;
  }, [id]);

  const { data, loading, error } = useGetAccountDetailQuery({
    variables: {
      getAccountInput: {
        id: accountId ?? '',
      },
      getEntriesInput: {
        accountId: accountId,
      },
    },
    skip: accountId == null,
  });

  return (
    data?.getAccount && (
      <div>
        <AccountDescriptionList
          data={{
            ...data?.getAccount,
          }}
        />
        <h3 className="mt-12 font-semibold text-dark-shades">
          {t('AccountDetail.title.entries')}
        </h3>
        <EntryTable data={data?.getEntries} />
      </div>
    )
  );
};
