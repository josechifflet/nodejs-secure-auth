import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { memo, useState } from 'react';

type Row = {
  id: number;
  [key: string]: any;
};

type Props = {
  data: Row[];
  columns: string[];
  colorScheme?: string;
  rowsPerPage?: number;
};

const CustomTable = ({
  data,
  columns,
  colorScheme = 'blue',
  rowsPerPage = 10,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = data
    .filter((row) => {
      if (!searchQuery) {
        return true;
      }
      return row.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .slice(startIndex, endIndex);

  return (
    <Table variant="simple" colorScheme={colorScheme}>
      <Thead>
        <Tr>
          <Td colSpan={columns.length}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={SearchIcon} color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
          </Td>
        </Tr>
        <Tr>
          {columns.map((column) => (
            <Th key={column}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {currentRows.map((row) => (
          <Tr key={row.id}>
            {Object.values(row).map((value, index) => (
              <Td key={index}>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
      <tfoot>
        <Tr>
          <Td colSpan={columns.length}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{' '}
                {data.length} entries
              </div>
              <div>
                <button disabled={currentPage === 1} onClick={handlePrevPage}>
                  <ChevronLeftIcon />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </Td>
        </Tr>
      </tfoot>
    </Table>
  );
};

export default memo(CustomTable);
