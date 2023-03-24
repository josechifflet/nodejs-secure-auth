import { VStack } from '@chakra-ui/react';
import { memo } from 'react';

import Board from '../components/DragAndDrop/Board';
import Layout from '../components/Layout';
import { useMe } from '../utils/hooks';
import { Ticket } from '../utils/types';

/**
 * Draft page of the website.
 *
 * @returns React functional component.
 */
const Drafts = () => {
  const { data } = useMe();

  const tickets: Ticket[] = [
    {
      id: 1,
      title: 'Martin Gomez',
      description: 'Add a search bar to the homepage',
      status: 'todo',
    },
    {
      id: 2,
      title: 'Martin Gomez',
      description: 'Fix the login button on the sign-in page',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Martin Gomez',
      description: 'Design a new logo for the website',
      status: 'done',
    },
    {
      id: 4,
      title: 'Martin Gomez',
      description: 'Reduce page load times by 50%',
      status: 'todo',
    },
    {
      id: 5,
      title: 'Martin Gomez',
      description: 'Migrate from MySQL to PostgreSQL',
      status: 'in-progress',
    },
    {
      id: 6,
      title: 'Martin Gomez',
      description: 'Refactor the authentication module',
      status: 'done',
    },
  ];

  return (
    <Layout title={['Draft']}>
      {data.status && data.status.user && (
        <VStack
          as="section"
          align={['center', 'start', 'start']}
          justify="center"
          w={['full', 'full', '80vw']}
          h="full"
          margin="0 auto"
          p={2}
        >
          <Board tickets={tickets} />
        </VStack>
      )}
    </Layout>
  );
};

export default memo(Drafts);
