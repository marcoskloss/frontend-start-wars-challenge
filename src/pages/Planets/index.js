import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Box, Flex, GridItem, Text, useTheme, Spinner } from "@chakra-ui/react";

import {
  Card,
  Tag,
  Layout,
  Input,
  Button,
  GridList,
  TagsContainer,
} from "../../components";
import { doRequest } from "../../lib/api";
import { useListContext } from "../../context/listContext";

export const PlanetsPage = () => {
  const { planets, setPlanets } = useListContext();
  const theme = useTheme();

  const [loadMore, setLoadMore] = useState({ show: false, nextUrl: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleFetchInitialList = useCallback(async () => {
    const [{ data }, error] = await doRequest({
      url: "/planets",
      setIsLoading,
    });

    if (error) {
      console.log(error);
      alert("Error when fetching data!");
      return;
    }

    setPlanets(
      data.results.map((item) => ({
        name: item.name,
        climate: item.climate,
        terrain: item.terrain,
        population: item.population,
        url: item.url,
      }))
    );

    setLoadMore({ show: !!data.next, nextUrl: data.next });
  }, [setPlanets]);

  const handleFetchNext = async () => {
    const [{ data }, error] = await doRequest({
      url: loadMore.nextUrl,
      config: { baseUrl: "" },
      setIsLoading,
    });

    if (error) {
      console.log(error);
      alert("Error when fetching data!");
      return;
    }

    const values = data.results.map((item) => ({
      name: item.name,
      climate: item.climate,
      terrain: item.terrain,
      population: item.population,
      url: item.url,
    }));

    setPlanets((prevState) => [...prevState, ...values]);
    setLoadMore({ show: !!data.next, nextUrl: data.next });
  };

  useEffect(handleFetchInitialList, [handleFetchInitialList]);

  return (
    <Layout bg={theme.colors.darkGreen}>
      <Box as="form">
        <Input
          name="filterInput"
          label="Planet name"
          focusBorderColor={theme.colors.green["700"]}
          value={inputValue}
          onChange={(ev) => setInputValue(ev.target.value)}
        />
      </Box>

      <Box py={8}>
        <GridList>
          {planets
            .filter((item) =>
              inputValue
                ? item.name.toLowerCase().includes(inputValue.toLowerCase())
                : true
            )
            .map((item) => (
              <GridItem key={item.name}>
                <Card
                  bg={theme.colors.green["700"]}
                  _hover={{
                    color: theme.colors.darkGreen,
                  }}
                >
                  <Text>{item.name}</Text>

                  <TagsContainer>
                    <Tag
                      title={"Climate"}
                      value={item.climate}
                      bg={theme.colors.green["500"]}
                    />
                    <Tag
                      title={"Population"}
                      value={item.population}
                      bg={theme.colors.green["500"]}
                    />
                    <Tag
                      title={"Terrain"}
                      value={item.terrain}
                      bg={theme.colors.green["500"]}
                    />
                  </TagsContainer>
                </Card>
              </GridItem>
            ))}
        </GridList>

        {isLoading && <Spinner my={4} mx="auto" display="block" />}

        {loadMore.show && (
          <Flex justifyContent="center" mt="8">
            <Button
              content="Load More"
              loadingText="Loading"
              bg={theme.colors.green["700"]}
              isLoading={isLoading}
              onClick={handleFetchNext}
            />
          </Flex>
        )}
      </Box>
    </Layout>
  );
};
