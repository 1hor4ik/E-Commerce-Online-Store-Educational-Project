import React, { useState } from "react";
import {
  Image,
  Stack,
  Flex,
  Text,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Product } from "../types";
import StarRating from "./StarRating";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [size, setSize] = useState<string | null>(null);

  const handleChangeSize = (selectedSize: string) => {
    setSize(selectedSize);
  };

  const handleAddToCart = () => {
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
        id: product.id,
        name: product.title,
        price: product.price,
        size,
        image: product.image,
      })
    );
    toast({
      isClosable: true,
      title: "Successfully Added To Cart!",
      status: "success",
    });
  };

  const modifyTitle = (title: string, maxWords: number) => {
    const words = title.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return title;
  };

  const modifiedTitle = modifyTitle(product.title, 8);
  const modifiedDescription =
    product.description.length > 100
      ? product.description.substring(0, 100) + "..."
      : product.description;

  return (
    <Stack
      w="300px"
      alignItems="center"
      justifyContent="center"
      rowGap="20px"
      flexDirection="column"
      cursor="pointer"
    >
      <Stack onClick={() => navigate(`/product/${product.id}`)}>
        <Image w="250px" h="300px" src={product.image} />
        <Heading>{modifiedTitle}</Heading>
        <Text>{modifiedDescription}</Text>
      </Stack>
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
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" justifyContent="space-between" gap="10px">
          <StarRating rating={product.rating.rate} />
          <Text>${product.price}</Text>
          <Text color="#ccc">({product.rating.count})</Text>
        </Flex>
        <Button
          onClick={handleAddToCart}
          _hover={{ background: "#0096FF" }}
          backgroundColor="#0096FF"
        >
          <FaShoppingCart color="#fff" />
        </Button>
      </Flex>
    </Stack>
  );
};

export default ProductItem;
