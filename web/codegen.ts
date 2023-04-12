import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  config: {
    skipTypename: true,
    enumsAsTypes: true,
    scalars: {
      numeric: 'number',
    },
  },
  documents: ['gql/queries/**/*.graphql', 'gql/mutations/**/*.graphql'],
  generates: {
    './gql/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {},
      plugins: [],
    },
  },
};

export default config;
