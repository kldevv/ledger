
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/api/graphql/server/schema/schema.gql",
  generates: {
    "src/api/graphql/_codegen/schema.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    },
    "src/api/graphql/_codegen/schema.introspection.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
