import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { FormErrorMessage } from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ name, label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }

      <ChakraInput
        ref={ref}
        id={name}
        name={name}
        focusBorderColor="purple.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
        {...rest}
      />

      { !!error && <FormErrorMessage>
        {error.message}
      </FormErrorMessage> }
    </FormControl>
  );
}

export const Input = forwardRef(InputBase);
