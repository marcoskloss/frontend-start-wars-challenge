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
import { useModal } from "../../hooks";
import { SpeciesDetails } from "./details";

export const SpeciesPage = () => {
  const { species, setSpecies } = useListContext();
  const theme = useTheme();

  const [loadMore, setLoadMore] = useState({ show: false, nextUrl: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [modal, setModal] = useModal();

  const handleFetchInitialList = useCallback(async () => {
    const [{ data }, error] = await doRequest({
      url: "/species",
      setIsLoading,
    });

    if (error) {
      console.log(error);
      alert("Error when fetching data!");
      return;
    }

    setSpecies(
      data.results.map((item) => ({
        name: item.name,
        url: item.url,
        classification: item.classification,
        language: item.language,
      }))
    );

    setLoadMore({ show: !!data.next, nextUrl: data.next });
  }, [setSpecies]);

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
      url: item.url,
      classification: item.classification,
      language: item.language,
    }));

    setSpecies((prevState) => [...prevState, ...values]);
    setLoadMore({ show: !!data.next, nextUrl: data.next });
  };

  const getSpecieData = useCallback(
    async (url) => {
      const [{ data }, error] = await doRequest({ url, setIsLoading });

      if (error) {
        console.log(error);
        alert("Error when fetching data!");
        return;
      }

      const people = await Promise.all(
        data.people.map(async (url) => {
          const [{ data }] = await doRequest({ url, setIsLoading });
          return data;
        })
      );

      setModal({
        show: true,
        data: {
          title: data.name,
          content: { ...data, people: people.map((item) => item.name) },
        },
      });
    },
    [setModal]
  );

  useEffect(handleFetchInitialList, [handleFetchInitialList]);

  return (
    <>
      {modal.show && (
        <SpeciesDetails
          data={modal.data}
          onClose={() => setModal({ show: false, data: {} })}
        />
      )}
      <Layout bg={theme.colors.pink["900"]}>
        <Box as="form">
          <Input
            name="filterInput"
            label="Specie name"
            focusBorderColor={theme.colors.pink["400"]}
            value={inputValue}
            onChange={(ev) => setInputValue(ev.target.value)}
          />
        </Box>

        <Box py={8}>
          <GridList>
            {species
              .filter((item) =>
                inputValue
                  ? item.name.toLowerCase().includes(inputValue.toLowerCase())
                  : true
              )
              .map((item) => (
                <GridItem
                  key={item.name}
                  onClick={() => getSpecieData(item.url)}
                >
                  <Card
                    color={theme.colors.darkBlue.base}
                    bg={theme.colors.pink["400"]}
                    _hover={{
                      color: theme.colors.pink["900"],
                    }}
                  >
                    <Text>{item.name}</Text>

                    <TagsContainer>
                      <Tag
                        title={"Language"}
                        value={item.language}
                        bg={theme.colors.pink["700"]}
                      />
                      <Tag
                        title={"Classification"}
                        value={item.classification}
                        bg={theme.colors.pink["700"]}
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
                bg={theme.colors.pink["700"]}
                isLoading={isLoading}
                onClick={handleFetchNext}
              />
            </Flex>
          )}
        </Box>
      </Layout>
    </>
  );
};
