import React from "react";
import Card from "../../components/Card/Card";
import { Box, Flex, Grid, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
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
  if (status === "loading") return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Spinner size="xl"/>
    </Flex>
  );
  if (status === "error") return (<Alert status='error'>
  <AlertIcon/>
  <AlertTitle>Error404:</AlertTitle>
  <AlertDescription>An Error was Occured!</AlertDescription> 
  </Alert>) + error.message;

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
