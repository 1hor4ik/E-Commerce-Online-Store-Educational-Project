import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

interface ShopSearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const MotionInput = motion(Input);

const ShopSearchBar: React.FC<ShopSearchBarProps> = ({ query, setQuery }) => {
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      as="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <MotionInput
        initial={{ opacity: 0, translateX: "-1000px" }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.5 }}
        maxW="700px"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search Products Here..."
      />
      <Button
        type="submit"
        leftIcon={<CiSearch fontSize="30px" />}
        visibility="hidden"
      ></Button>
    </Flex>
  );
};

export default ShopSearchBar;
