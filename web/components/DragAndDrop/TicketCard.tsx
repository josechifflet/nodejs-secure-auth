import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import { useDrag } from 'react-dnd';

import { Ticket } from '../../utils/types';

interface Props {
  ticket: Ticket;
}

const TicketCard: React.FC<Props> = ({ ticket }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TICKET',
    item: { type: 'TICKET', ticket },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      opacity={isDragging ? 0.5 : 1}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      py={2}
      px={5}
      cursor="move"
    >
      <Flex align="center">
        <Avatar
          mr="12px"
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />

        <Text fontSize="m">{ticket.title}</Text>
      </Flex>
    </Box>
  );
};

export default memo(TicketCard);
