
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Overwrite existing output files.
  overwrite: true,
  // Verbose codegen console output.
  verbose: true,
  config: {
    // Overriden the naming convention of the output.
    namingConvention: {
      // https://the-guild.dev/graphql/codegen/docs/config-reference/naming-convention#keep-names-as-is
      enumValues: 'keep'
    }
  },
  schema: "src/api/graphql/schema/**/*.gql",
  documents: "src/api/graphql/client/**/*.gql",
  generates: {
    "src/api/graphql/__generated__/index.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-operations", "typescript-react-apollo"],
    },
    "src/api/graphql/__generated__/schema.introspection.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
