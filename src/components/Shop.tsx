import React, { useState, useEffect } from "react";
import { Stack, Heading, Button, Flex, Spinner } from "@chakra-ui/react";
import ShopSearchBar from "./ShopSearchBar";
import ProductItem from "./ProductItem";
import { Product } from "../types";
import { motion } from "framer-motion";
import axios from "axios";
import { useCategory } from "./CategoryContext";
import { useLocation } from "react-router-dom";

const Shop: React.FC = () => {
  const [allItems, setAllItems] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { category, setCategory } = useCategory();
  const [sortOption, setSortOption] = useState<string>("");
  const location = useLocation();

  const MotionStack = motion(Stack);

  const sortItems = (items: Product[], option: string) => {
    if (option === "highest") {
      return items.sort((a, b) => b.price - a.price);
    } else if (option === "lowest") {
      return items.sort((a, b) => a.price - b.price);
    }
    return items;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromQuery = queryParams.get("category");
    if (categoryFromQuery) {
      setCategory(decodeURIComponent(categoryFromQuery)); // Decoding Category
    }
  }, [location.search, setCategory]);

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setAllItems(response.data);
      setFilteredItems(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      const filtered = allItems.filter((item) => {
        const matchesCategory =
          category === "all" ||
          item.category.toLowerCase() === category.toLowerCase();
        const matchesQuery = item.title
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      });
      const sorted = sortItems(filtered, sortOption);
      setFilteredItems(sorted);
      setLoading(false);
    }, 300); // Short debounce
    return () => clearTimeout(timeoutId);
  }, [query, category, sortOption, allItems]);

  const getButtonStyles = (isSelected: boolean) => ({
    w: "150px",
    background: isSelected ? "#0096FF" : "none",
    color: isSelected ? "#fff" : "#000",
    border: isSelected ? "none" : "1px solid #000",
    borderRadius: "20px",
    p: "5px 15px",
  });

  return (
    <Flex w="100%" justifyContent="space-between" alignItems="flex-start">
      <Stack
        position="sticky"
        top="200px"
        zIndex="1100"
        paddingLeft="50px"
        display="flex"
        borderRight="2px solid lightgray"
        flexDirection="column"
        alignItems="left"
        justifyContent="left"
        rowGap="50px"
        w="400px"
      >
        <Heading fontSize="35px">Filter Products</Heading>
        <Flex
          alignItems="left"
          flexWrap="wrap"
          justifyContent="left"
          gap="20px"
        >
          <Button
            {...getButtonStyles(category === "all")}
            onClick={() => setCategory("all")}
          >
            All Products
          </Button>
          <Button
            {...getButtonStyles(category === "men's clothing")}
            onClick={() => setCategory("men's clothing")}
          >
            Men's
          </Button>
          <Button
            {...getButtonStyles(category === "women's clothing")}
            onClick={() => setCategory("women's clothing")}
          >
            Women's
          </Button>
          <Button
            {...getButtonStyles(category === "jewelery")}
            onClick={() => setCategory("jewelery")}
          >
            Jewelery
          </Button>
          <Button
            {...getButtonStyles(category === "electronics")}
            onClick={() => setCategory("electronics")}
          >
            Electronics
          </Button>
        </Flex>
        <Heading fontSize="35px">Sort By</Heading>
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="left"
          flexWrap="wrap"
          justifyContent="left"
          gap="20px"
        >
          <Button
            {...getButtonStyles(sortOption === "")}
            onClick={() => setSortOption("")}
          >
            No Sort
          </Button>
          <Button
            {...getButtonStyles(sortOption === "highest")}
            onClick={() => setSortOption("highest")}
          >
            Price (Highest First)
          </Button>
          <Button
            {...getButtonStyles(sortOption === "lowest")}
            onClick={() => setSortOption("lowest")}
          >
            Price (Lowest First)
          </Button>
        </Stack>
      </Stack>
      <Stack
        display="flex"
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        rowGap="50px"
        className="ProductsSectionWrap"
      >
        <ShopSearchBar query={query} setQuery={setQuery} />
        <Flex
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap="50px"
          position="relative"
        >
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <Heading
                  paddingTop="150px"
                  color="lightgray"
                  fontSize="40px"
                  textAlign="center"
                >
                  Found 0 items on query: {query}
                </Heading>
              ) : (
                filteredItems.map((item) => (
                  <MotionStack
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={item.id}
                  >
                    <ProductItem product={item} />
                  </MotionStack>
                ))
              )}
            </>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Shop;
