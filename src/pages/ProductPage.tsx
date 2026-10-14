import React, { useEffect, useState, useCallback } from "react";
import {
  Stack,
  Text,
  Spinner,
  Image,
  Box,
  Button,
  Heading,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import StarRating from "../components/StarRating";
import { motion } from "framer-motion";

const ProductPage: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<any>(null);
  const { productId } = useParams<{ productId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  const handleChangeSize = useCallback((selectedSize: string) => {
    setSize(selectedSize);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!size) {
      toast({
        isClosable: true,
        title: "Please Select The Size!",
        status: "error",
      });
      return;
    }
    dispatch(
      addToCart({
        id: productData.id,
        name: productData.title,
        price: productData.price,
        size,
        image: productData.image,
      })
    );
    toast({
      isClosable: true,
      title: "Successfully Added To Cart!",
      status: "success",
    });
  }, [size, productData, dispatch, toast]);

  const MotionBox = motion(Box);
  const MotionStack = motion(Stack);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => setProductData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      padding="20px"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <MotionBox
        initial={{ opacity: 0, translateX: "-1000px" }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.5 }}
        flex="1"
        maxWidth="50%"
        display="flex"
        justifyContent="center"
      >
        <Image
          src={productData?.image}
          alt={productData?.title}
          maxWidth="100%"
          maxHeight="700px"
          objectFit="contain"
        />
      </MotionBox>
      <MotionStack
        initial={{ opacity: 0, translateX: "1000px" }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.5 }}
        flex="1"
        spacing="20px"
        textAlign={{ base: "center", md: "left" }}
      >
        <Heading as="h1" size="xl">
          {productData?.title}
        </Heading>
        <Text fontSize="3xl" fontWeight="bold" color="blue.600">
          ${productData?.price}
        </Text>
        <Flex alignItems="center" gap="10px">
          <StarRating rating={productData?.rating.rate} />
          <Text color="#ccc">({productData?.rating.count})</Text>
        </Flex>
        <Text my="4" fontSize="xl" h="fit-content">
          {productData?.description}
        </Text>
        <Flex width="100%" gap="10px" alignItems="center" justifyContent="left">
          {["S", "M", "L"].map((sizeOption) => (
            <Button
              key={sizeOption}
              backgroundColor={size === sizeOption ? "#0096FF" : "none"}
              color={size === sizeOption ? "white" : "black"}
              _hover="none"
              variant="ghost"
              border="1px solid #ccc"
              onClick={() => handleChangeSize(sizeOption)}
            >
              {sizeOption}
            </Button>
          ))}
        </Flex>
        <Text fontSize="20px" display="flex" gap="10px" alignItems="center">
          Category: <Text color="#2B6CB0">{productData?.category}</Text>
        </Text>
        <Flex gap="20px" alignItems="center" justifyContent="left">
          <Button
            onClick={handleAddToCart}
            leftIcon={<FaShoppingCart />}
            maxW="250px"
            colorScheme="blue"
            size="lg"
            my="4"
          >
            Add to Cart
          </Button>
          <Button
            leftIcon={<CiHeart fontSize="30px" />}
            maxW="250px"
            variant="ghost"
            colorScheme="blue"
            size="lg"
            my="4"
          >
            Add To Wish List
          </Button>
        </Flex>
      </MotionStack>
    </Flex>
  );
};

export default ProductPage;
