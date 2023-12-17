import { useGetCategoriesQuery } from "@/api/graphql";
import { useVaultContext } from "@/hooks";
import { CategoryTable } from "..";

export const CategoryDashboard: React.FC = () => {
  const [{ curVaultId }] = useVaultContext();

  const { data, loading, error } = useGetCategoriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
  });

  return <CategoryTable data={data?.getCategories ?? []} />;
}