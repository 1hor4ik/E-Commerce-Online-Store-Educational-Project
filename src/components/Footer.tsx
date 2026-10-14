import React from "react";
import { Stack, Text, Divider, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { BsPaypal } from "react-icons/bs";
import { FaStripe } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <Stack w="100%" justifyContent="center" alignItems="center" p="20px 50px">
      <Divider w="100%" color="lightgray" />
      <Flex
        className="footer-links-block"
        w="100%"
        justifyContent="left"
        flexWrap="wrap"
        gap="200px"
        alignItems="flex-start"
        p="20px 50px"
      >
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="left"
          justifyContent="left"
          className="footer-link-block"
          rowGap="10px"
        >
          <Heading fontSize="25px" marginBottom="20px">
            USEFUL PAGES
          </Heading>
          <Text
            _hover={{
              textDecoration: "underline",
              transition: "0.3s all ease",
            }}
            fontSize="20px"
            as={Link}
            to="/"
          >
            Home Page
          </Text>
          <Text
            _hover={{
              textDecoration: "underline",
              transition: "0.3s all ease",
            }}
            fontSize="20px"
            as={Link}
            to="/cart"
          >
            Your Cart Page
          </Text>
          <Text
            _hover={{
              textDecoration: "underline",
              transition: "0.3s all ease",
            }}
            fontSize="20px"
            as={Link}
          >
            Wish List Page
          </Text>
          <Text
            _hover={{
              textDecoration: "underline",
              transition: "0.3s all ease",
            }}
            fontSize="20px"
            as={Link}
          >
            Lorem Page
          </Text>
        </Stack>
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="left"
          justifyContent="left"
          className="footer-link-block"
          rowGap="10px"
        >
          <Heading fontSize="25px" marginBottom="20px">
            QUESTIONS & ANSWERS
          </Heading>
          <Text
            _hover={{
              textDecoration: "underline",
              transition: "0.3s all ease",
            }}
            fontSize="20px"
            as={Link}
          >
            How to buy products?
          </Text>
          <Text
            _hover={{
              textDecoration: "underline",
              transition: "0.3s all ease",
            }}
            fontSize="20px"
            as={Link}
          >
            How do I return a product?
          </Text>
          <Text
            _hover={{
              textDecoration: "underline",
              transition: "0.3s all ease",
            }}
            fontSize="20px"
            as={Link}
          >
            How to remove items from the cart?
          </Text>
          <Text
            _hover={{
              textDecoration: "underline",
              transition: "0.3s all ease",
            }}
            fontSize="20px"
            as={Link}
          >
            How to type my address?
          </Text>
        </Stack>
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="left"
          justifyContent="left"
          className="footer-link-block"
          rowGap="10px"
        >
          <Heading fontSize="25px" marginBottom="20px">
            CONTACT US
          </Heading>
          <Text
            _hover={{
              textDecoration: "underline",
              transition: "0.3s all ease",
            }}
            as={Link}
            fontSize="20px"
          >
            Contact Form
          </Text>
          <Text fontSize="20px">Phone number: +380XXXXXXXXX</Text>
          <Text fontSize="20px">Email: multishop@gmail.com</Text>
        </Stack>
        <Flex
          alignItems="center"
          justifyContent="center"
          gap="20px"
          className="companies-logos"
        >
          <RiVisaFill fontSize="60px" />
          <FaCcMastercard fontSize="60px" />
          <BsPaypal fontSize="60px" />
          <FaStripe fontSize="60px" />
        </Flex>
      </Flex>
    </Stack>
  );
};

export default Footer;
