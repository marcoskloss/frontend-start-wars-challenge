import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  useTheme,
} from "@chakra-ui/react";

export const Input = ({ label, name, onChange, value, ...props }) => {
  const theme = useTheme();

  return (
    <FormControl py={3}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput
        id={name}
        name={name}
        w="300px"
        focusBorderColor={theme.colors.lightPurple}
        value={value}
        onChange={onChange}
        {...props}
      />
    </FormControl>
  );
};
