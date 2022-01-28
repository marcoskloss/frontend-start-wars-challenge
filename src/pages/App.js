import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  GridItem,
  Text,
  useTheme,
  HStack,
  Spinner,
} from "@chakra-ui/react";

import { Card, Tag, Layout, Input, Button } from "../components";
import { doRequest } from "../lib/api";

export const App = () => {
  const theme = useTheme();

  const [people, setPeople] = useState([]);
  const [loadMore, setLoadMore] = useState({ show: false, nextUrl: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    (async () => {
      const [{ data }, error] = await doRequest({
        url: "/people",
        setIsLoading,
      });

      if (error) {
        console.log(error);
        alert("Error when fetching data!");
        return;
      }

      setPeople(
        data.results.map((item) => ({
          name: item.name,
          url: item.url,
          mass: `${item.mass} kg`,
          gender: item.gender,
          height: `${item.height} cm`,
        }))
      );
      setLoadMore({ show: !!data.next, nextUrl: data.next });
    })();
  }, []);

  return (
    <Layout>
      <Box as="form">
        <Input
          name="filterInput"
          label="Character name"
          value={inputValue}
          onChange={(ev) => setInputValue(ev.target.value)}
        />
      </Box>

      <Box py={8}>
        <SimpleGrid rowGap={6} columnGap={4} columns={{ base: 1, md: 2 }}>
          {people
            .filter((item) =>
              inputValue
                ? item.name.toLowerCase().includes(inputValue.toLowerCase())
                : true
            )
            .map((item) => (
              <GridItem key={item.name}>
                <Card
                  bg={theme.colors.darkBlue["600"]}
                  _hover={{
                    color: theme.colors.lightPurple,
                  }}
                >
                  <Text>{item.name}</Text>

                  <HStack gap={1} mt={3}>
                    <Tag title={"Gender"} value={item.gender} />
                    <Tag title={"Mass"} value={item.mass} />
                    <Tag title={"Height"} value={item.height} />
                  </HStack>
                </Card>
              </GridItem>
            ))}
        </SimpleGrid>

        {isLoading && <Spinner my={4} mx="auto" display="block" />}

        {loadMore.show && (
          <Flex justifyContent="center" mt="8">
            <Button
              content="Load More"
              loadingText="Loading"
              isLoading={isLoading}
              onClick={async () => {
                const [{ data }, error] = await doRequest({
                  url: loadMore.nextUrl,
                  config: { baseUrl: "" },
                });

                if (error) {
                  console.log(error);
                  alert("Error when fetching data!");
                  return;
                }

                const values = data.results.map((item) => ({
                  name: item.name,
                  url: item.url,
                  mass: `${item.mass} kg`,
                  gender: item.gender,
                  height: `${item.height} cm`,
                }));

                setPeople((prevState) => [...prevState, ...values]);
                setLoadMore({ show: !!data.next, nextUrl: data.next });
              }}
            />
          </Flex>
        )}
      </Box>
    </Layout>
  );
};
