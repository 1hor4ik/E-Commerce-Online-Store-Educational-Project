import React, { useEffect, useRef } from "react";
import { Stack, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { Product } from "../types";
import ProductItem from "./ProductItem";
import { motion, useAnimation, useInView } from "framer-motion";

export const MotionHeading = motion(Heading);
export const MotionWrapItem = motion(WrapItem);

interface ProductsListProps {
  products: Product[];
  length: number;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, length }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        translateX: 0,
        transition: { delay: i * 0.1 },
      }));
    }
  }, [controls, inView]);

  return (
    <Stack
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      padding="70px 50px"
      ref={ref}
    >
      <MotionHeading
        initial={{ opacity: 0, translateX: "-1000px" }}
        animate={controls}
        custom={0}
        transition={{ ease: "linear", duration: 0.5 }}
      >
        Featured Products
      </MotionHeading>
      <Wrap marginTop="50px" spacing="50px" justify="center">
        {products.slice(0, length).map((product, index) => (
          <MotionWrapItem
            key={product.id}
            custom={index + 1}
            initial={{ opacity: 0, translateY: 50 }}
            animate={controls}
          >
            <ProductItem product={product} />
          </MotionWrapItem>
        ))}
      </Wrap>
    </Stack>
  );
};

export default ProductsList;
