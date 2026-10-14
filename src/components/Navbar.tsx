import React from "react";
import {
  Button,
  Flex,
  Text,
  Stack,
  Avatar,
  Tooltip,
  useColorMode,
  Heading,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../redux/cartSelector";
import { IoIosMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { deleteUser } from "../redux/userSlice";

const MotionFlex = motion(Flex);

interface NavbarProps {
  username: string;
  avatarImg?: string;
}

const Navbar: React.FC<NavbarProps> = ({ username, avatarImg }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-us");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MotionFlex
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "linear", duration: 1 }}
      position="sticky"
      top="0"
      zIndex="1000"
      padding="30px 50px"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={colorMode === "light" ? "white" : "gray.800"}
    >
      <Heading>MULTI SHOP</Heading>

      <Flex
        display={{ base: "none", lg: "flex" }}
        alignItems="center"
        justifyContent="center"
        gap="20px"
      >
        <Button onClick={() => navigate("/")} fontSize="20px" variant="ghost">
          Home
        </Button>
        <Button
          onClick={() => navigate("/shop")}
          fontSize="20px"
          variant="ghost"
        >
          Shop
        </Button>
        <Button fontSize="20px" variant="ghost">
          About
        </Button>
        <Button fontSize="20px" variant="ghost" onClick={scrollToContact}>
          Contact Us
        </Button>
      </Flex>

      <Flex alignItems="center" justifyContent="center" gap="20px">
        <Tooltip label="Logout" aria-label="Logout tooltip">
          <Button
            variant="ghost"
            onClick={() => dispatch(deleteUser())}
            leftIcon={<CiLogout fontSize="30px" />}
            display={{ base: "none", lg: "flex" }}
          />
        </Tooltip>
        <Tooltip
          label="Change Color Mode"
          aria-label="Change Color Mode tooltip"
        >
          <Button
            onClick={toggleColorMode}
            height="50px"
            variant="ghost"
            display={{ base: "none", lg: "flex" }}
          >
            {colorMode === "light" ? (
              <MdOutlineDarkMode fontSize="30px" />
            ) : (
              <MdOutlineLightMode fontSize="30px" />
            )}
          </Button>
        </Tooltip>
        <Avatar src={avatarImg} name={username} />
        <Tooltip label="Cart" aria-label="Cart tooltip">
          <Button
            position="relative"
            onClick={() => navigate("/cart")}
            variant="ghost"
            leftIcon={<FaShoppingCart fontSize="30px" />}
          >
            <Text
              position="absolute"
              right="5px"
              top="-10px"
              padding="5px 10px"
              borderRadius="50%"
              backgroundColor="red"
              color="white"
            >
              {cart.totalAmount}
            </Text>
          </Button>
        </Tooltip>

        <Flex display={{ base: "flex", lg: "none" }}>
          <Button
            variant="ghost"
            fontSize="40px"
            leftIcon={<IoIosMenu />}
            onClick={onOpen}
          />
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody alignItems="center" justifyContent="center">
                <Stack
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  rowGap="50px"
                >
                  <Button fontSize="25px" variant="ghost" onClick={onClose}>
                    Home
                  </Button>
                  <Button fontSize="25px" variant="ghost" onClick={onClose}>
                    Shop
                  </Button>
                  <Button fontSize="25px" variant="ghost" onClick={onClose}>
                    About
                  </Button>
                  <Button
                    fontSize="25px"
                    variant="ghost"
                    onClick={() => {
                      scrollToContact();
                      onClose();
                    }}
                  >
                    Contact Us
                  </Button>
                  <Button
                    fontSize="23px"
                    variant="ghost"
                    leftIcon={<CiLogout fontSize="40px" />}
                    onClick={() => {
                      dispatch(deleteUser());
                      onClose();
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              </DrawerBody>
              <DrawerFooter display="flex" justifyContent="space-between">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    toggleColorMode();
                    onClose();
                  }}
                >
                  {colorMode === "light" ? (
                    <MdOutlineDarkMode fontSize="30px" />
                  ) : (
                    <MdOutlineLightMode fontSize="30px" />
                  )}
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </MotionFlex>
  );
};

export default Navbar;
