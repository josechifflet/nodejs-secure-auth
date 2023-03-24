import { Flex } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';

import { useStatusAndUser } from '../../utils/hooks';
import Head from './Head';
import SidebarWithHeader from './SidebarWithHeader';

/**
 * Props typing that will handle below component's hydration process.
 */
type Props = {
  children: ReactNode;
  title: string[];
};

/**
 * Layout is a React Functional Component that functions as the main layout page of the application.
 * This is used in every page in order to standarize the base layout.
 * Layout is complete with SEO integrations.
 *
 * @param Props - Items to hydrate the component with.
 * @returns React Functional Component.
 */
const Layout = ({ children, title }: Props) => {
  const { status } = useStatusAndUser();

  return (
    <>
      <Head title={title} />

      {status && status.isAuthenticated && (
        <Flex h="90vh" direction="column">
          <SidebarWithHeader>{children}</SidebarWithHeader>
        </Flex>
      )}

      {status && !status.isAuthenticated && (
        <Flex h="90vh" direction="column">
          {children}
        </Flex>
      )}
    </>
  );
};

export default memo(Layout);
