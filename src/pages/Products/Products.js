import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { Box, Flex, Grid, Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { getProductList } from "../../Data";
import {
  addCollectionDocuments,
  getCategoriesAndDocuments,
} from "../../FirebaseUtils";

import products from "../../products.json";

function Products() {
  const [items, setItems] = useState();
  // SEND JSON DATA TO FIREBASE
  useEffect(() => {
    addCollectionDocuments("products", products);
  }, []);

  //GET PRODUCTS FROM FIREBASE
  useEffect(
    /* async */ () => {
      // BURADA YUKARIDAKİ GİBİ USEEFFECT İÇİNDE ASYNC FUNCTİON KULLANAMAYIZ. bUNU YAPMAK İÇİN AŞAĞIDA OLDUĞU GİBİ YENİ BİR ASYNC FUNCTİON OLUŞTURUYORUZ:

      const getProducts= async () => {
        const data = await getCategoriesAndDocuments();
        setItems(data);
      };
      // return getCategoriesMap;
      getProducts();
    },

    []
  );

  console.log("products", items && items.products);
  // PRODUCTS FROM BACKEND
  // const {
  //   error,
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery("products", getProductList, {
  //   getNextPageParam: (lastGroup, allGroups) => {
  //     const morePagesExist =
  //       lastGroup?.length === 12; /* lastGroup varsa ve length'i 12 ise */
  //     if (!morePagesExist) {
  //       return;
  //     }
  //     return allGroups.length + 1;
  //   },
  // });
  // if (status === "loading") return (
  //   <Flex justifyContent="center" alignItems="center" height="100vh">
  //     <Spinner size="xl"/>
  //   </Flex>
  // );
  // if (status === "error") return "An error has occurred: " + error.message;

  // console.log(data);

  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {items &&
          items.products.map((product, i) => (
            <React.Fragment key={i}>
              <Box>
                <Card item={product} />
              </Box>
            </React.Fragment>
          ))}
      </Grid>
    </div>
  );
}

// PRODUCTS FROM BACKEND
// return (
// <div>
//   <Grid templateColumns="repeat(3, 1fr)" gap={6}>
//     {data.pages.map((group, i) => (
//       <React.Fragment key={i}>
//         {group.map((item, i) => (
//           <Box key={i}>
//             <Card item={item} />
//           </Box>
//         ))}
//       </React.Fragment>
//     ))}
//   </Grid>
//   <Flex mt="10" justifyContent="center">
//     <button
//       onClick={() => fetchNextPage()}
//       disabled={!hasNextPage || isFetchingNextPage}
//     >
//       {isFetchingNextPage
//         ? "Loading more..."
//         : hasNextPage
//         ? "Load More"
//         : "Nothing more to load"}
//     </button>
//   </Flex>
//   <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
// </div>
//   );
// }

export default Products;
