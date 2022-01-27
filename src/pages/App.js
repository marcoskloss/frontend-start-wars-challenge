import * as React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
  GridItem,
  Input,
  Text,
  useTheme,
} from "@chakra-ui/react";

import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { api } from "../lib/api";

export const App = () => {
  const theme = useTheme();
  console.log(theme);

  const [people, setPeople] = React.useState([]);
  const [loadMore, setLoadMore] = React.useState({ show: false, nextUrl: "" });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.get("/people");

      console.log(data);

      setPeople(
        data.results.map((item) => ({
          name: item.name,
          url: item.url,
        }))
      );

      setLoadMore({ show: !!data.next, nextUrl: data.next });
      setIsLoading(false);
    })();
  }, []);

  return (
    <Box w="100%" minH="100vh" bg="#020b1a">
      <Box maxW={800} w="100%" m="auto">
        <Header />

        <Box as="main" padding={{ base: 2, lg: 0 }}>
          <Box>
            <Box as="form">
              <FormControl py={3}>
                <FormLabel htmlFor="input">Character name</FormLabel>
                <Input id="input" w="300px" />
              </FormControl>
            </Box>
          </Box>

          <Box py={8}>
            <SimpleGrid rowGap={6} columnGap={4} columns={{ base: 1, md: 2 }}>
              {people.map((item) => (
                <GridItem key={item.name}>
                  <Card
                    bg={theme.colors.darkBlue["600"]}
                    _hover={{
                      color: theme.colors.lightPurple,
                    }}
                  >
                    <Text>{item.name}</Text>
                  </Card>
                </GridItem>
              ))}
            </SimpleGrid>

            {isLoading && <Text>Loading...</Text>}

            {loadMore.show && (
              <Flex justifyContent="center" mt="8">
                <Button
                  bg={theme.colors.lightPurple}
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);

                    const { data } = await api.get(loadMore.nextUrl, {
                      baseURL: "",
                    });

                    setIsLoading(false);

                    const values = data.results.map((item) => ({
                      name: item.name,
                      url: item.url,
                    }));

                    setPeople((prevState) => [...prevState, ...values]);
                    setLoadMore({ show: !!data.next, nextUrl: data.next });
                  }}
                >
                  {isLoading ? "Loading" : "Load more"}
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
