import { HStack, Link, Spacer } from '@chakra-ui/react';
import { memo } from 'react';

/**
 * The whole part of the Footer in the web application.
 *
 * @returns React functional component.
 */
const Footer = () => (
  <HStack as="footer" p={4} spacing={2} fontSize="xs">
    <Link _hover={{ textDecor: 'none', color: 'orange.400' }} isExternal>
      &copy; {new Date().getFullYear()}
    </Link>

    <Spacer />
  </HStack>
);

export default memo(Footer);
