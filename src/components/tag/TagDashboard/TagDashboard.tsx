import { useGetTagsQuery } from "@/api/graphql";
import { useVaultContext } from "@/hooks";
import { TagTable } from "..";

export const TagDashboard: React.FC = () => {
  const [{ curVaultId }] = useVaultContext();
  const { data, loading, error } = useGetTagsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
    fetchPolicy: 'cache-and-network',
  });

  return <TagTable data={data?.getTags ?? []} />;
};
