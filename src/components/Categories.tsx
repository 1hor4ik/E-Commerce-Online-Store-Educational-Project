import React from "react";
import { Grid, GridItem, Image, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ShoesCtgImg from "../assets/choes-category-img.jpg";
import JeweleryImg from "../assets/jewelery.jpg";
import ElectronicsImg from "../assets/electronics.jpg";
import MenCtgImg from "../assets/mens-category-img.jpg";
import WomenCtgImg from "../assets/women-category-img.jpg";

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <Grid
      templateAreas={{
        base: `"women" "accessories" "men" "kids" "shoes"`,
        md: `"women accessories men" "kids accessories shoes"`,
      }}
      gridTemplateRows={{
        base: "repeat(5, 350px)",
        md: "repeat(2, 350px)",
      }}
      gridTemplateColumns={{
        base: "1fr",
        md: "repeat(3, 1fr)",
      }}
      gap={2}
      p={2}
      m="20px 0"
      w="100%"
      mx="auto"
    >
      <GridItem area="women">
        <Box
          _hover={{
            transform: "translateY(-20px) ",
          }}
          transition="0.4s all ease"
          cursor="pointer"
          position="relative"
          height="100%"
          onClick={() => handleCategoryClick("women's clothing")}
        >
          <Image
            src={WomenCtgImg}
            alt="Women"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Text
            position="absolute"
            bottom="10px"
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            color="black"
            px={4}
            py={1}
            borderRadius="md"
          >
            Women
          </Text>
        </Box>
      </GridItem>

      <GridItem area="accessories" rowSpan={2}>
        <Box
          _hover={{
            transform: "translateY(-20px) ",
          }}
          position="relative"
          transition="0.4s all ease"
          cursor="pointer"
          height="100%"
          onClick={() => handleCategoryClick("jewelery")}
        >
          <Image
            src={JeweleryImg}
            alt="Accessories"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Text
            position="absolute"
            bottom="10px"
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            color="black"
            px={4}
            py={1}
            borderRadius="md"
          >
            Jewelery
          </Text>
        </Box>
      </GridItem>

      <GridItem area="men">
        <Box
          _hover={{
            transform: "translateY(-20px) ",
          }}
          transition="0.4s all ease"
          cursor="pointer"
          position="relative"
          height="100%"
          onClick={() => handleCategoryClick("men's clothing")}
        >
          <Image
            src={MenCtgImg}
            alt="Men"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Text
            position="absolute"
            bottom="10px"
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            color="black"
            px={4}
            py={1}
            borderRadius="md"
          >
            Men
          </Text>
        </Box>
      </GridItem>

      <GridItem area="kids">
        <Box
          _hover={{
            transform: "translateY(-5px) ",
          }}
          transition="0.4s all ease"
          cursor="pointer"
          position="relative"
          height="100%"
          onClick={() => handleCategoryClick("electronics")}
        >
          <Image
            src={ElectronicsImg}
            alt="Kids"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Text
            position="absolute"
            bottom="10px"
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            color="black"
            px={4}
            py={1}
            borderRadius="md"
          >
            Electronics
          </Text>
        </Box>
      </GridItem>

      <GridItem area="shoes">
        <Box
          _hover={{
            transform: "translateY(-5px) ",
          }}
          transition="0.4s all ease"
          cursor="pointer"
          position="relative"
          height="100%"
          onClick={() => handleCategoryClick("shoes")}
        >
          <Image
            src={ShoesCtgImg}
            alt="Shoes"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Text
            position="absolute"
            bottom="10px"
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            color="black"
            px={4}
            py={1}
            borderRadius="md"
          >
            Shoes
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Categories;
