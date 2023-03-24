import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import React, { memo } from 'react';
import { useDrop } from 'react-dnd';

import { ColumnType, Ticket } from '../../utils/types';
import TicketCard from './TicketCard';

interface Props {
  column: ColumnType;
  handleDrop: (ticket: Ticket, targetColumn: ColumnType) => void;
}

const Column: React.FC<Props> = ({ column, handleDrop }) => {
  const [, drop] = useDrop({
    accept: 'TICKET',
    canDrop: (item: any, monitor: any) => {
      const ticket = item.ticket;
      return ticket.status !== column.id;
    },
    drop: (item: any, monitor: any) => {
      const ticket = item.ticket;
      const targetColumn = column;
      handleDrop(ticket, targetColumn);
    },
  });

  return (
    <Box
      ref={drop}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      overflow="hidden"
      m="4"
      w="full"
    >
      <Flex bg="gray.50" p="4" justify="space-between" alignItems="center">
        <Heading as="h2" size="md" mb="0">
          {column.title}
        </Heading>
      </Flex>
      <Box p="4">
        <VStack spacing="4" align="stretch">
          {column.tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default memo(Column);
