import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Box, Flex, GridItem, Text, useTheme, Spinner } from "@chakra-ui/react";

import { PeopleDetails } from "./details";
import { useListContext } from "../../context/listContext";
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
import { useModal } from "../../hooks";

export const HomePage = () => {
  const { people, setPeople } = useListContext();
  const theme = useTheme();

  const [loadMore, setLoadMore] = useState({ show: false, nextUrl: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const [modal, setModal] = useModal();

  const handleFetchInitialList = useCallback(async () => {
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
  }, [setPeople]);

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
      mass: `${item.mass} kg`,
      gender: item.gender,
      height: `${item.height} cm`,
    }));

    setPeople((prevState) => [...prevState, ...values]);
    setLoadMore({ show: !!data.next, nextUrl: data.next });
  };

  const getPersonData = useCallback(
    async (url) => {
      const [{ data }, error] = await doRequest({ url, setIsLoading });

      if (error) {
        console.log(error);
        alert("Error when fetching data!");
        return;
      }

      setModal({
        show: true,
        data: {
          title: data.name,
          content: data,
        },
      });
    },
    [setModal]
  );

  useEffect(handleFetchInitialList, [handleFetchInitialList]);

  return (
    <>
      {modal.show && (
        <PeopleDetails
          data={modal.data}
          onClose={() => setModal({ show: false, data: {} })}
        />
      )}

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
          <GridList>
            {people
              .filter((item) =>
                inputValue
                  ? item.name.toLowerCase().includes(inputValue.toLowerCase())
                  : true
              )
              .map((item) => (
                <GridItem
                  key={item.name}
                  onClick={() => getPersonData(item.url)}
                >
                  <Card
                    bg={theme.colors.darkBlue["600"]}
                    _hover={{
                      color: theme.colors.lightPurple,
                    }}
                  >
                    <Text>{item.name}</Text>

                    <TagsContainer>
                      <Tag title={"Gender"} value={item.gender} />
                      <Tag title={"Mass"} value={item.mass} />
                      <Tag title={"Height"} value={item.height} />
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
