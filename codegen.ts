import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: "**/*.{gql,graphql}",
  schema: "https://flyby-router-demo.herokuapp.com",
  generates: {
    "graphql/generated/schema.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};
export default config;
