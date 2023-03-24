import { Box, Divider } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ColumnType, Ticket } from '../../utils/types';
import Column from './Column';

interface Props {
  tickets: Ticket[];
}

const KanbanBoard: React.FC<Props> = ({ tickets }) => {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: 'todo',
      title: '6to A',
      tickets: tickets.filter((t) => t.status === 'todo'),
    },
    {
      id: 'in-progress',
      title: '6to B',
      tickets: tickets.filter((t) => t.status === 'in-progress'),
    },
    {
      id: 'done',
      title: '6to C',
      tickets: tickets.filter((t) => t.status === 'done'),
    },
  ]);

  const handleDrop = (ticket: Ticket, targetColumn: ColumnType) => {
    const newColumns = [...columns];
    const sourceColumn = columns.find((column) =>
      column.tickets.includes(ticket)
    );

    if (sourceColumn && targetColumn) {
      sourceColumn.tickets = sourceColumn.tickets.filter(
        (t) => t.id !== ticket.id
      );
      targetColumn.tickets = [...targetColumn.tickets, ticket];
      setColumns(newColumns);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box w="full" display="flex" justifyContent="center">
        {columns.map((column, i) => (
          <Column key={column.id} column={column} handleDrop={handleDrop} />
        ))}
      </Box>
    </DndProvider>
  );
};

export default KanbanBoard;
