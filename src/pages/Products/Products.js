import React from "react";
import Card from "../../components/Card/Card";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { getProductList } from "../../Data";
function Products() {
  const {
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", getProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist =
        lastGroup?.length === 12; /* lastGroup varsa ve length'i 12 ise */
      if (!morePagesExist) {
        return;
      }
      return allGroups.length + 1;
    },
  });
  if (status === "loading") return "Loading...";
  if (status === "error") return "An error has occurred: " + error.message;

  console.log(data);
  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>

        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item, i) => (
              <Box key={i}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
            </Grid>
        <Flex mt="10" justifyContent="center">
          
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </Flex>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
  
    </div>
  );
}

export default Products;
