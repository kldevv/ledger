import { useGetCategoryDetailQuery } from '@/api/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { EntryTable } from '@/components/entry';
import { CategoryDescriptionList } from '..';
import { AccountTable } from '@/components/account';
import { useTranslation } from 'next-i18next';

export const CategoryDetail: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('category')
  const { id } = router.query;

  const categoryId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id;
  }, [id]);

  const { data, loading, error } = useGetCategoryDetailQuery({
    variables: {
      getCategoryInput: {
        id: categoryId ?? '',
      },
      getEntriesInput: {
        categoryId,
      },
      getAccountsInput: {
        categoryId,
      },
    },
    skip: categoryId == null,
  });

  return (
    data?.getCategory && (
      <div>
        <CategoryDescriptionList
          data={{
            ...data?.getCategory,
          }}
        />
        <h3 className="mt-12 font-semibold text-dark-shades">
          {t('CategoryDetail.title.accounts')}
        </h3>
        <AccountTable data={data?.getAccounts} />
        <h3 className="mt-12 font-semibold text-dark-shades">
          {t('CategoryDetail.title.entries')}
        </h3>
        <EntryTable data={data?.getEntries} />
      </div>
    )
  );
};
