import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import Cart from "../components/Cart";
import { selectCart } from "../redux/cartSelector";
import { useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const cart = useSelector(selectCart);
  const navigate = useNavigate();
  console.log(cart);
  return (
    <Stack w="100%" h="100vh" alignItems="center" justifyContent="center">
      <Button
        position="absolute"
        left="2%"
        top="4%"
        onClick={() => navigate("/")}
        leftIcon={<IoIosArrowRoundBack />}
      >
        Back To Home
      </Button>
      <Cart />
    </Stack>
  );
};

export default CartPage;
