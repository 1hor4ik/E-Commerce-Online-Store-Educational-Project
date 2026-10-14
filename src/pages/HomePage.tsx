import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Stack, Text } from "@chakra-ui/react";
import { selectUser } from "../redux/userSelector";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../types";
import Slider from "../components/Slider";
import ProductsList from "../components/ProductsList";
import { Product } from "../types";
import Categories from "../components/Categories";
import ContactForm from "../components/ContactForm";

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => selectUser(state));
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<Product[]>("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Stack position="relative">
      <Slider />
      {error ? (
        <Text>Error: {error}</Text>
      ) : isLoading ? (
        <Spinner
          w="100px"
          h="100px"
          position="absolute"
          transform="translate: (-50%, -50%)"
          top="50%"
          left="50%"
        />
      ) : (
        <>
          <ProductsList length={5} products={products} />
          <Categories />
          <ContactForm />
        </>
      )}
    </Stack>
  );
};

export default HomePage;
