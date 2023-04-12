import { useToast } from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { memo, useState } from 'react';
import { FaLockOpen } from 'react-icons/fa';

import axios from '../../../utils/http';
import routes from '../../../utils/routes';
import Form from '../../Form';
import FormLinks from '../../Form/FormLinks';
import SubmitButton from '../../Form/SubmitButton';
import TextInput from '../../Input/TextInput';
import { SuccessToast } from '../../Toast';

/**
 * Special component for forget passwords.
 *
 * @returns React functional component.
 */
const ForgotPasswordForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const resetPassword = (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    axios({
      method: 'POST',
      url: '/api/v1/auth/forgot-password',
      data: { username, email },
    })
      .then((res) => SuccessToast(toast, res.message))
      .catch((err) =>
        setError(
          err.message ? err.message : 'Internal error! Please try again later!'
        )
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Form
      title="Olvide mi contraseña"
      description="Restablece tu contraseña de tu cuenta."
      error={error}
      onSubmit={resetPassword}
    >
      <TextInput
        label="Username"
        placeholder="Username"
        value={username}
        setValue={setUsername}
        helper=""
        type="text"
      />

      <TextInput
        label="Email"
        placeholder="ran@gmail.com"
        value={email}
        setValue={setEmail}
        helper="El email asociado a tu cuenta."
        type="email"
      />

      <FormLinks
        routes={[
          {
            href: routes.login,
            text: 'Recuerdas tu contraseña? Inicia sesión.',
            color: 'blue.400',
          },
        ]}
      />

      <SubmitButton
        Icon={FaLockOpen}
        inputs={[username, email]}
        isLoading={isLoading}
        text="Restablecer contraseña"
      />
    </Form>
  );
};

export default memo(ForgotPasswordForm);
