import { Heading, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout';
import NotAuthRoute from '../components/NotAuthRoute';
import LoginForm from '../components/Pages/Login/LoginForm';
import Spinner from '../components/Spinner';
import CustomTable from '../components/Table/CustomTable';
import { RootState } from '../store';
import { useStatusAndUser } from '../utils/hooks';

/**
 * Homepage of the website.
 *
 * @returns React functional component.
 */
const Home = () => {
  const { status, isLoading } = useStatusAndUser();
  const selectedYear = useSelector(
    (state: RootState) => state.selectedYear.year
  );

  if (isLoading) return <Spinner />;

  const studentData = [
    { id: 1, name: 'John Doe', age: 30, gender: 'Male', year: 2022 },
    { id: 2, name: 'Jane Doe', age: 25, gender: 'Female', year: 2021 },
    { id: 3, name: 'Bob Smith', age: 40, gender: 'Male', year: 2020 },
    // add more rows as needed
  ];

  return (
    <Layout title={['Home']}>
      <VStack
        as="section"
        align={['center', 'start', 'start']}
        justify="center"
        w={['full', 'full', '60vw']}
        h="full"
        margin="0 auto"
        p={2}
      >
        {status && status.isAuthenticated && status.user ? (
          <VStack w="full" align="center" spacing={4}>
            <Heading as="h1" fontSize="xl" textAlign="center" mb={4}>
              Students in {selectedYear}
            </Heading>
            <CustomTable
              data={studentData}
              columns={['Name', 'Age', 'Gender', 'Sex', 'Year']}
            />
          </VStack>
        ) : (
          <VStack w="full" align="center" spacing={4}>
            <NotAuthRoute>
              <Layout title={['Login']}>
                <LoginForm />
              </Layout>
            </NotAuthRoute>
          </VStack>
        )}
      </VStack>
    </Layout>
  );
};

export default memo(Home);
