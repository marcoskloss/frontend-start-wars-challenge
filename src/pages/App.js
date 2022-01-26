import * as React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";

import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { api } from "../lib/api";

export const App = () => {
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
    <Box maxW={800} w="100%" m="auto">
      <Header />

      <Box>
        <Box as="form">
          <FormControl py={3}>
            <FormLabel htmlFor="input">Name</FormLabel>
            <Input id="input" w="300px" />
          </FormControl>
        </Box>
      </Box>

      <Box my={8}>
        <Grid rowGap={6} columnGap={4} templateColumns="repeat(2, 1fr)">
          {people.map((item) => (
            <GridItem key={item.name}>
              <Card>
                <Text>{item.name}</Text>
              </Card>
            </GridItem>
          ))}
        </Grid>
        {isLoading && <Text>Loading...</Text>}

        {loadMore.show && (
          <Flex justifyContent="center" mt="8">
            <Button
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
              Load More
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};
