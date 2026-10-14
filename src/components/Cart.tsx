import React from "react";
import {
  Stack,
  Divider,
  Heading,
  Text,
  Flex,
  Image,
  Button,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseItemAmount,
  decreaseItemAmount,
  removeItemFromCart,
  clearCart,
} from "../redux/cartSlice";
import { selectCart } from "../redux/cartSelector";
import telegramIcon3D from "../assets/Telgram3dIcon.png";

const Cart: React.FC = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItemFromCart({ id: itemId }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncrease = (itemId: number) => {
    dispatch(increaseItemAmount({ id: itemId }));
  };

  const handleDecrease = (itemId: number) => {
    dispatch(decreaseItemAmount({ id: itemId }));
  };

  const limitNameLength = (name: string, maxWords: number) => {
    const words = name.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return name;
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Stack
      display="flex"
      w="100%"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      padding="20px"
      overflowX="hidden"
      overflowY="auto"
    >
      <Stack
        borderRadius="20px"
        border="1px solid #ccc"
        maxW="1100px"
        padding="20px"
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          w="100%"
        >
          <Flex
            alignItems="center"
            w="100%"
            justifyContent="space-between"
            mb="20px"
            flexDirection={isMobile ? "column" : "row"}
          >
            <Heading>Shopping Cart</Heading>
            <Flex alignItems="center" justifyContent="center" gap="20px">
              {cart.cart.length === 0 ? (
                <Button
                  _hover={{ backgroundColor: "#d94848" }}
                  disabled
                  cursor="not-allowed"
                  backgroundColor="#d94848"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              ) : (
                <Button
                  _hover={{ backgroundColor: "red" }}
                  backgroundColor="red"
                  color="#fff"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              )}
              <Text fontSize="30px" fontWeight="bold">
                {cart.totalAmount} Items
              </Text>
            </Flex>
          </Flex>
          <Divider />
          <Stack
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            rowGap="40px"
            w="100%"
            pt="20px"
          >
            <Flex
              alignItems="center"
              w="100%"
              justifyContent="space-between"
              flexDirection={isMobile ? "column" : "row"}
            >
              <Text
                width={isMobile ? "100%" : "200px"}
                color="#ccc"
                fontSize="20px"
              >
                PRODUCT
              </Text>
              <Text
                width={isMobile ? "100%" : "200px"}
                color="#ccc"
                fontSize="20px"
              >
                QUANTITY
              </Text>
              <Text
                width={isMobile ? "100%" : "200px"}
                color="#ccc"
                fontSize="20px"
              >
                PRICE
              </Text>
              <Text
                width={isMobile ? "100%" : "200px"}
                color="#ccc"
                fontSize="20px"
              >
                SIZE
              </Text>
              <Text
                width={isMobile ? "100%" : "200px"}
                color="#ccc"
                fontSize="20px"
              >
                REMOVE ITEM
              </Text>
            </Flex>
            {cart.cart.length === 0 ? (
              <Heading color="#ccc">YOUR CART IS EMPTY...</Heading>
            ) : (
              cart.cart.map((item, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  w="100%"
                  justifyContent="space-between"
                  flexDirection={isMobile ? "column" : "row"}
                >
                  <Flex
                    w={isMobile ? "100%" : "200px"}
                    gap="20px"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection={isMobile ? "column" : "row"}
                  >
                    <Image src={item.image} width="100px" height="100px" />
                    <Text fontSize="20px" fontWeight="600">
                      {limitNameLength(item.name, 5)}
                    </Text>
                  </Flex>

                  <Flex
                    w={isMobile ? "100%" : "200px"}
                    gap="20px"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection={isMobile ? "column" : "row"}
                  >
                    <Button
                      onClick={() => handleDecrease(item.id)}
                      fontSize="40px"
                      _hover={{ background: "none" }}
                      variant="ghost"
                      color="blue"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      width="50px"
                      value={item.amount}
                      readOnly
                    />
                    <Button
                      onClick={() => handleIncrease(item.id)}
                      fontSize="40px"
                      _hover={{ background: "none" }}
                      variant="ghost"
                      color="blue"
                    >
                      +
                    </Button>
                  </Flex>

                  <Text
                    w={isMobile ? "100%" : "200px"}
                    fontSize="20px"
                    fontWeight="600"
                  >
                    ${item.totalPrice.toFixed(2)}
                  </Text>

                  <Text
                    w={isMobile ? "100%" : "200px"}
                    fontSize="20px"
                    fontWeight="600"
                  >
                    {item.size}
                  </Text>

                  <Button
                    _hover="none"
                    onClick={() => handleRemoveItem(item.id)}
                    color="#fff"
                    backgroundColor="red"
                    leftIcon={<MdDelete />}
                    h="40px"
                    w={isMobile ? "100%" : "auto"}
                  >
                    Remove Item
                  </Button>
                </Flex>
              ))
            )}
          </Stack>
        </Stack>
        <Flex
          w="100%"
          padding="20px"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="20px"
          backgroundColor="#E7E7E7"
          flexDirection={isMobile ? "column" : "row"}
        >
          <Stack
            direction={isMobile ? "column" : "row"}
            display="flex"
            gap="20px"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={telegramIcon3D}
              alt="Telegram Icon"
              width="100px"
              height="100px"
            />
            <Text fontSize="20px" color="#292929" textAlign="center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum,
              iusto vero. Beatae accusamus corrupti obcaecati?
            </Text>
          </Stack>

          <Stack
            w={isMobile ? "100%" : "50%"}
            display="flex"
            flexDirection="column"
            rowGap="20px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Text fontSize="22px" fontWeight="600">
              TOTAL: ${cart.totalPrice.toFixed(2)}
            </Text>
            <Button
              width="150px"
              _hover={{ backgroundColor: "#0096FF", transform: "scale(1.1)" }}
              backgroundColor="#0096FF"
              color="#fff"
            >
              CHECKOUT
            </Button>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Cart;
