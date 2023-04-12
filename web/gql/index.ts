import { gql } from './__generated__';

export const GET_TRADERS_PAGINATED =
  gql(`query GetTraders($page: Float!, $take: Float!, $param: String) {
  traders(page: $page, take: $take, param: $param) {
    data {
      ID
    }
    count
    currentPage
    lastPage
    nextPage
    prevPage
  }
}`);

export const GET_SYMBOLS = gql(`query GetSymbols {
  symbols {
    symbol
  }
}`);
