import { useQuery } from '@apollo/client';
import { Box, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { memo, useState } from 'react';

import Layout from '../components/Layout';
import Hello from '../components/Pages/Home/Hello';
import Links from '../components/Pages/Home/Links';
import Spinner from '../components/Spinner';
import { GET_SYMBOLS } from '../gql';
import { useStatusAndUser } from '../utils/hooks';

/**
 * Homepage of the website.
 *
 * @returns React functional component.
 */
const Home = () => {
  const { status, isLoading } = useStatusAndUser();

  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const handleSymbolClick = (symbol: string) => {
    setSelectedSymbol(symbol);
  };
  const { data, loading } = useQuery(GET_SYMBOLS);

  if (isLoading) return <Spinner />;

  return (
    <Layout title={['Home']}>
      {status && status.isAuthenticated && status.user ? (
        <>
          <Box
            as="aside"
            p={1}
            w={['full', 'full', '15vw']}
            bgColor="white"
            boxShadow="md"
            borderRadius="md"
          >
            <Text fontWeight="bold" mb={1}>
              Symbols ({JSON.stringify(data?.symbols.length)})
            </Text>
            <List>
              {data?.symbols.map(({ symbol }) => (
                <ListItem
                  key={symbol}
                  py={1}
                  px={1}
                  cursor="pointer"
                  bgColor={
                    selectedSymbol === symbol ? 'gray.100' : 'transparent'
                  }
                  _hover={{ bgColor: 'gray.100' }}
                  onClick={() => handleSymbolClick(symbol)}
                >
                  <Text mr={2}>{symbol}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box></Box>
        </>
      ) : (
        <VStack
          as="section"
          align={['center', 'start', 'start']}
          justify="center"
          w={['full', 'full', '60vw']}
          h="full"
          margin="0 auto"
          p={2}
        >
          <VStack w="full" align="center" spacing={4}>
            <Hello />
            <Links />
          </VStack>
        </VStack>
      )}
    </Layout>
  );
};

export default memo(Home);
