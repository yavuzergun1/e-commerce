import React from 'react';
import { useQuery } from 'react-query';
import { getProductList } from '../../Data';
import { Spinner, Flex } from '@chakra-ui/react';
import Card from "../../components/Card/Card"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Loading3QuartersOutlined } from '@ant-design/icons';

function Home() {

  const { isLoading, isError, data, error } = useQuery(
    "admin:products",
    getProductList
  );
  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl"/>
      </Flex>
    );
  }
  if (isError) {
    return <div>Error.</div>;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  console.log(data);


  return (
    <div>
      <Carousel
    swipeable={true}
    draggable={true}
    showDots={false}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={1000}
    keyBoardControl={true}
    customTransition="transform 3000ms ease-in-out"
    transitionDuration={6000}
    containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile"]}
    // deviceType={this.props.deviceType}
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    
  >
{data && data.map((item) => 

(<div key={item._id}>
  <Card item={item}/>
  
  </div>)
)}
       
  </Carousel>
    </div>
  )
}

export default Home