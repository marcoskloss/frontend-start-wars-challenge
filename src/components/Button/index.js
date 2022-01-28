import { useTheme, Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({
  isLoading,
  onClick,
  content,
  loadingText,
  ...props
}) => {
  const theme = useTheme();

  return (
    <ChakraButton
      bg={theme.colors.lightPurple}
      isLoading={isLoading}
      loadingText={loadingText}
      _hover={{
        filter: "brightness(0.85)",
      }}
      onClick={onClick}
      {...props}
    >
      {content}
    </ChakraButton>
  );
};
